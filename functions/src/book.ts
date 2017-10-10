import axios from "axios";
import cheerio = require("cheerio");
import { Request, Response } from "express";
import * as geoip from "geoip-lite";
import { parse } from "url";

import { callApi } from "./rakuten";
import { httpsFunction, urlToItemConverter } from "./utils";

export function isAmazonUrl(url: string): boolean {
    return !!parse(url).hostname.match(/amazon/);
}

async function convertUrlIntoIsbn(url: string): Promise<string> {
    const { data } = await axios.get(url);

    if (isAmazonUrl(url)) {
        return data.match(/<li><b>ISBN-10:<\/b> *([0-9X]+) *<\/li>/i)[1];
    }

    return cheerio.load(data)("meta[property=\"books:isbn\"]").attr("content");
}

export const convertUrlIntoBook = urlToItemConverter(async (url: string): Promise<any> => {
    return (await callApi({ isbn: await convertUrlIntoIsbn(url) }))[0];
}, "AddBook");

export default httpsFunction(async ({ ip, query: { url } }: Request, response: Response) => {
    console.log("Country:", geoip.lookup(ip).country);
    response.send(await convertUrlIntoBook(url));
});
