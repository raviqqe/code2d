import axios from "axios";
import cheerio = require("cheerio");
import { Request, Response } from "express";

import { callApi } from "./rakuten";
import { httpsFunction } from "./utils";

function extractIsbn(html: string): string {
    return cheerio.load(html)("meta[property=\"books:isbn\"]").attr("content");
}

export async function convertUrlIntoBook(url: string): Promise<any> {
    const { Items: [
        {
            affiliateUrl, author, itemCaption, itemPrice, largeImageUrl,
            publisherName, salesDate, title,
        },
    ] } = await callApi({ isbn: extractIsbn((await axios.get(url)).data) });

    return {
        author,
        description: itemCaption,
        image: largeImageUrl,
        name: title,
        price: itemPrice,
        publisher: publisherName,
        salesDate,
        url: affiliateUrl,
    };
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    response.send(await convertUrlIntoBook(url));
});
