import { Request, Response } from "express";
import * as functions from "firebase-functions";
import { parse as parseUrl } from "url";
import YouTube = require("youtube-api");

import { httpsFunction, urlToItemConverter } from "./utils";

YouTube.authenticate({ key: functions.config().youtube.key, type: "key" });

export const convertUrlIntoVideo = urlToItemConverter(async (url: string) => {
    const id = parseUrl(url, true).query.v;
    const { description, publishedAt, title } = await new Promise((resolve, reject) =>
        YouTube.videos.list(
            { id, part: "snippet" },
            (error, data) => error ? reject(error) : resolve(data.items[0].snippet))) as any;

    return {
        description,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        name: title,
        publishedAt,
        url,
    };
}, "AddVideo");

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    const video = await convertUrlIntoVideo(url);

    console.log("Video:", video);

    response.send(video);
});
