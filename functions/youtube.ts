import * as functions from "firebase-functions";
import * as url from "url";
import YouTube = require("youtube-api");

YouTube.authenticate({ key: functions.config().youtube.key, type: "key" });

export async function getVideoDetails(uri: string): Promise<any> {
    return await new Promise((resolve, reject) =>
        YouTube.videos.list(
            { id: url.parse(uri, true).query.v, part: "snippet" },
            (error, data) => error ? reject(error) : resolve(data.items[0].snippet)));
}
