import axios from "axios";
import cheerio = require("cheerio");
import { Request, Response } from "express";

import { callApi } from "./rakuten";
import { httpsFunction } from "./utils";

function extractIsbn(html: string): string {
    return cheerio.load(html)("meta[property=\"books:isbn\"]").attr("content");
}

export async function convertUrlIntoBook(url: string): Promise<any> {
    return (await callApi({ isbn: extractIsbn((await axios.get(url)).data) }))[0];
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    response.send(await convertUrlIntoBook(url));
});
