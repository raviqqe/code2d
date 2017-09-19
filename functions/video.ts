import { Request, Response } from "express";
import * as functions from "firebase-functions";
import * as url from "url";
import YouTube = require("youtube-api");

import { httpsFunction } from "./utils";

YouTube.authenticate({ key: functions.config().youtube.key, type: "key" });

async function getVideoDetails(uri: string): Promise<any> {
    return await new Promise((resolve, reject) =>
        YouTube.videos.list(
            { id: url.parse(uri, true).query.v, part: "snippet" },
            (error, data) => error ? reject(error) : resolve(data.items[0].snippet)));
}

export default httpsFunction(async ({ query: { uri } }: Request, response: Response) => {
    const { description, publishedAt, title } = await getVideoDetails(uri);

    console.log("Video:", { description, publishedAt, title });

    response.send({ name: title, description, publishedAt });
});
