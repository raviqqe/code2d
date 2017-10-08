import axios from "axios";
import cheerio = require("cheerio");
import { Request, Response } from "express";
import { parse } from "url";

import { callApi } from "./rakuten";
import { httpsFunction } from "./utils";

async function convertUrlIntoIsbn(url: string): Promise<string> {
    const { data } = await axios.get(url);

    if (parse(url).hostname.match(/amazon/)) {
        return data.match(/<li><b>ISBN-10:<\/b> *([0-9X]+) *<\/li>/i)[1];
    }

    return cheerio.load(data)("meta[property=\"books:isbn\"]").attr("content");
}

export async function convertUrlIntoBook(url: string): Promise<any> {
    return (await callApi({ isbn: await convertUrlIntoIsbn(url) }))[0];
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    response.send(await convertUrlIntoBook(url));
});
