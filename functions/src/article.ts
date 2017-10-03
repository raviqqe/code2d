import axios from "axios";
import { Request, Response } from "express";
import is = require("is_js");
import unfluff = require("unfluff");
import * as url from "url";

import { httpsFunction } from "./utils";

export function convertIntoUrl(urlOrPath: string, baseUrl: string): string {
    if (!urlOrPath || is.url(urlOrPath)) {
        return urlOrPath;
    }

    const { host, protocol } = url.parse(baseUrl);

    return url.format({ host, pathname: urlOrPath, protocol });
}

export async function convertUrlIntoArticle(url: string) {
    const { date, favicon, image, softTitle, text, title }
        = unfluff((await axios.get(url, { headers: { Accept: "text/html" } })).data);

    if (!softTitle) {
        throw new Error("Failed to extract title.");
    }

    return {
        date,
        favicon: convertIntoUrl(favicon, url),
        image: convertIntoUrl(image, url),
        name: softTitle,
        text,
        url,
    };
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    const article = await convertUrlIntoArticle(url);

    console.log("Article:", article);

    response.send(article);
});
