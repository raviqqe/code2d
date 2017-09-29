import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as msgpack from "msgpack-lite";
import { parse } from "url";

import { convertUrlIntoArticle } from "./article";
import { httpsFunction } from "./utils";
import { convertUrlIntoVideo } from "./video";

class File {
    private file;

    constructor(path: string) {
        this.file = admin.storage().bucket().file(path);
    }

    public read = async () => await msgpack.decode((await this.file.download())[0]);

    public write = async (content: any) => await this.file.save(msgpack.decode(content));
}

export default httpsFunction(
    async ({ query: { url } }: Request, response: Response, userId: string) => {
        const isVideo = parse(url).hostname === "www.youtube.com";

        const item = await (isVideo ? convertUrlIntoVideo : convertUrlIntoArticle)(url);

        console.log("Item:", item);

        const file = new File(`/users/${userId}/${isVideo ? "videos" : "articles"}/todo`);
        await file.write([item, ...(await file.read())]);

        response.sendStatus(200);
    });
