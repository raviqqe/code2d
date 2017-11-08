import { IVideo } from "common/domain/video";
import { Request, Response } from "express";
import * as functions from "firebase-functions";
import { parse as parseUrl } from "url";
import YouTube = require("youtube-api");

import { getTrendingItems, IAnalyticsAttributes } from "./analytics";
import { httpsFunction, trendingItemsFunction, urlToItemFunction } from "./functions";
import { urlToItemConverter } from "./utils";

YouTube.authenticate({ key: functions.config().youtube.key, type: "key" });

export const analyticsAttributes: IAnalyticsAttributes = {
    action: "AddVideo",
    dimension: 2,
};

export const itemsName = "videos";

export function isValidUrl(url: string): boolean {
    return parseUrl(url).hostname === "www.youtube.com";
}

export function convertItemIntoId({ url }): string {
    return url;
}

export const convertUrlIntoItem = urlToItemConverter(async (url: string): Promise<IVideo> => {
    const id = parseUrl(url, true).query.v;
    const { description, publishedAt, title } = await new Promise((resolve, reject) =>
        YouTube.videos.list(
            { id, part: "snippet" },
            (error, data) => error ? reject(error) : resolve(data.items[0].snippet))) as any;

    return {
        description,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        id,
        name: title,
        publishedAt,
        url,
    };
});

export const video = urlToItemFunction(convertUrlIntoItem, { analyticsAttributes });

export const trendingVideos = trendingItemsFunction(async (_, response: Response) => {
    response.send(await getTrendingItems(analyticsAttributes.dimension, convertUrlIntoItem));
});
