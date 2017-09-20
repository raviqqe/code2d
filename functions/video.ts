import { Request, Response } from "express";
import * as functions from "firebase-functions";
import { parse as parseUrl } from "url";
import YouTube = require("youtube-api");

import { httpsFunction } from "./utils";

YouTube.authenticate({ key: functions.config().youtube.key, type: "key" });

async function getVideoDetails(url: string): Promise<any> {
    return await new Promise((resolve, reject) =>
        YouTube.videos.list(
            { id: parseUrl(url, true).query.v, part: "snippet" },
            (error, data) => error ? reject(error) : resolve(data.items[0].snippet)));
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    const { description, publishedAt, title } = await getVideoDetails(url);

    console.log("Video:", { description, publishedAt, title });

    response.send({ name: title, description, publishedAt });
});
