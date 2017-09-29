import { Request, Response } from "express";
import * as functions from "firebase-functions";
import { parse as parseUrl } from "url";
import YouTube = require("youtube-api");

import { httpsFunction } from "./utils";

YouTube.authenticate({ key: functions.config().youtube.key, type: "key" });

export async function convertUrlToVideo(url: string) {
    const { description, publishedAt, title } = await new Promise((resolve, reject) =>
        YouTube.videos.list(
            { id: parseUrl(url, true).query.v, part: "snippet" },
            (error, data) => error ? reject(error) : resolve(data.items[0].snippet))) as any;

    return { name: title, description, publishedAt };
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    const video = await convertUrlToVideo(url);

    console.log("Video:", video);

    response.send(video);
});
