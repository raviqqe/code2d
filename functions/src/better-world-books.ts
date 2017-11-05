import axios from "axios";
import cheerio = require("cheerio");
import { IBook } from "common/domain/book";
import { parse as parseUrl } from "url";
import { parseString } from "xml2js";

export async function parseXml(xml: string): Promise<any> {
    return await new Promise((resolve, reject) =>
        parseString(xml, (error, result) => error ? reject(error) : resolve(result)));
}

export async function convertIsbnIntoBook(isbn: string): Promise<IBook> {
    const { DetailURLPage: [detailUrl] } = (
        await parseXml((await axios.get(
            "http://products.betterworldbooks.com/service.aspx",
            { params: { ItemId: isbn } })).data)).ItemLookupResponse.Items[0].Item[0];

    const { data } = await axios.get(detailUrl);

    const {
        author, datePublished, description, image, name, publisher, url,
    } = JSON.parse(cheerio.load(data)('script[type="application/ld+json"]').html());

    const priceMatch = data.match(/NEW[^$]*(\$[0-9]+(\.[0-9]+)?)/);

    return {
        author,
        description,
        id: url,
        image,
        isbn,
        name,
        price: priceMatch && priceMatch[1],
        publisher,
        salesDate: datePublished,
        url,
    };
}

export function convertUrlIntoIsbn(url: string): string {
    return url.match(/id-([0-9]+)\./)[1];
}

export function isValidUrl(url: string): boolean {
    return parseUrl(url).hostname === "www.betterworldbooks.com";
}
