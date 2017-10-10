import axios from "axios";
import cheerio = require("cheerio");
import * as functions from "firebase-functions";
import { parse as parseUrl } from "url";

function convertItemIntoBook({
    affiliateUrl, author, itemCaption, itemPrice, largeImageUrl,
    publisherName, salesDate, title,
    }) {
    return {
        author,
        description: itemCaption,
        image: largeImageUrl,
        name: title,
        price: `¥${itemPrice}`,
        publisher: publisherName,
        salesDate,
        url: affiliateUrl,
    };
}

export async function callApi(query: object): Promise<any[]> {
    const { data: { Items } } = await axios.get(
        "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404",
        {
            params: {
                affiliateId: functions.config().rakuten.affiliate.id,
                applicationId: functions.config().rakuten.id,
                formatVersion: 2,
                ...query,
            },
        });

    return Items.map(convertItemIntoBook);
}

export async function convertUrlIntoIsbn(url: string): Promise<string> {
    return cheerio.load((await axios.get(url)).data)("meta[property=\"books:isbn\"]")
        .attr("content");
}

export async function convertIsbnIntoBook(isbn: string): Promise<any> {
    return (await callApi({ isbn }))[0];
}

export function isValidUrl(url: string): boolean {
    return parseUrl(url).hostname === "books.rakuten.co.jp";
}
