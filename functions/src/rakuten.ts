import axios from "axios";
import cheerio = require("cheerio");
import * as functions from "firebase-functions";
import { ISBN } from "isbn";
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

export async function callApi(kind: "Total" | "Book", query: object): Promise<any[]> {
    const { data: { Items } } = await axios.get(
        `https://app.rakuten.co.jp/services/api/Books${kind}/Search/20170404`,
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
    return (await callApi("Total", { isbnjan: ISBN.parse(isbn).asIsbn13() }))[0];
}

export function isValidUrl(url: string): boolean {
    return ["books.rakuten.co.jp", "hb.afl.rakuten.co.jp"].includes(parseUrl(url).hostname);
}
