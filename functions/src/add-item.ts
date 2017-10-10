import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as msgpack from "msgpack-lite";
import nanoid = require("nanoid");
import { parse } from "url";

import { convertUrlIntoArticle } from "./article";
import { convertUrlIntoBook, isAmazonUrl } from "./book";
import { httpsFunction } from "./utils";
import { convertUrlIntoVideo } from "./video";

class File {
    private file;

    constructor(path: string) {
        this.file = admin.storage().bucket().file(path);
    }

    public read = async () => await msgpack.decode((await this.file.download())[0]);

    public write = async (content: any) => await this.file.save(msgpack.encode(content));
}

// This function is used exclusively by browser extensions.
export default httpsFunction(
    async ({ query: { url } }: Request, response: Response, userId: string) => {
        let convert: (url: string) => Promise<any> = convertUrlIntoArticle;
        let directory: "articles" | "videos" | "books" = "articles";

        switch (parse(url).hostname) {
            case "www.youtube.com":
                convert = convertUrlIntoVideo;
                directory = "videos";
                break;
            case "hb.afl.rakuten.co.jp":
            case "books.rakuten.co.jp":
                convert = convertUrlIntoBook;
                directory = "books";
                break;
            default:
                if (isAmazonUrl(url)) {
                    convert = convertUrlIntoBook;
                    directory = "books";
                }
        }

        const item = await convert(url);

        if (!item.name) {
            throw new Error(`Invalid item is detected: ${item}`);
        }

        console.log("Item:", item);

        const file = new File(`/users/${userId}/${directory}/todo`);
        let items = [];

        try {
            items = await file.read();
        } catch (error) {
            if (error.code === 404) {
                console.log(error);
            } else {
                throw error;
            }
        }

        await file.write([{ id: nanoid(), ...item }, ...items]);

        response.send(item);
    }, { noCache: true });
