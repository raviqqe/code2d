import axios from "axios";
import { Request, Response } from "express";
import is = require("is_js");
import unfluff = require("unfluff");
import * as url from "url";

import { getTrendingItems, IAnalyticsAttributes } from "./analytics";
import { httpsFunction, urlToItemConverter } from "./utils";

export const analyticsAttributes: IAnalyticsAttributes = {
    action: "AddArticle",
    dimension: 1,
};

export const storageDirectory = "articles";

export function convertIntoUrl(urlOrPath: string, baseUrl: string): string {
    if (!urlOrPath || is.url(urlOrPath)) {
        return urlOrPath;
    }

    const { host, protocol } = url.parse(baseUrl);

    return url.format({ host, pathname: urlOrPath, protocol });
}

export function convertItemIntoId({ url }): string {
    return url;
}

export const convertUrlIntoItem = urlToItemConverter(async (url: string) => {
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
});

export const article = httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    const article = await convertUrlIntoItem(url);

    console.log("Article:", article);

    response.send(article);
});

export const trendingArticles = httpsFunction(async (_, response: Response) => {
    response.send(await getTrendingItems(analyticsAttributes.dimension, convertUrlIntoItem));
});
