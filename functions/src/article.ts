import axios from "axios";
import { IArticle } from "common/domain/article";
import { Request, Response } from "express";
import he = require("he");
import is = require("is_js");
import unfluff = require("unfluff");
import * as url from "url";

import { getTrendingItems, IAnalyticsAttributes } from "./analytics";
import { httpsFunction, trendingItemsFunction, urlToItemFunction } from "./functions";
import { urlToItemConverter } from "./utils";

export const analyticsAttributes: IAnalyticsAttributes = {
    action: "AddArticle",
    dimension: 1,
};

export const itemsName = "articles";

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

export function extractTitle(html: string): string | null {
    const match = html.match(/<title>((.|\n|\r)*?)<\/title>/);
    return match && match[1].trim();
}

export const convertUrlIntoItem = urlToItemConverter(async (url: string): Promise<IArticle> => {
    const { data } = await axios.get(url, { headers: { Accept: "text/html" } });

    const error = console.error;
    console.error = () => undefined;
    const { date, favicon, image, softTitle, text } = unfluff(data);
    console.error = error;

    return {
        date,
        favicon: convertIntoUrl(favicon, url),
        id: url,
        image: convertIntoUrl(image, url),
        name: he.decode(extractTitle(data)) || softTitle,
        text,
        url,
    };
});

export const article = urlToItemFunction(convertUrlIntoItem, { analyticsAttributes });

export const trendingArticles = trendingItemsFunction(async (_, response: Response) => {
    response.send(await getTrendingItems(analyticsAttributes.dimension, convertUrlIntoItem));
});
