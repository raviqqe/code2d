import axios from "axios";
import cheerio = require("cheerio");
import { Request, Response } from "express";

import { callApi } from "./rakuten";
import { httpsFunction } from "./utils";

async function convertUrlIntoIsbn(url: string): Promise<string> {
    return cheerio.load((await axios.get(url)).data)
        ("meta[property=\"books:isbn\"]").attr("content");
}

export async function convertUrlIntoBook(url: string): Promise<any> {
    return (await callApi({ isbn: await convertUrlIntoIsbn(url) }))[0];
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    response.send(await convertUrlIntoBook(url));
});
