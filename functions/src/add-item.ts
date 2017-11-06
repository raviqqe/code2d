import * as json from "common/infra/json";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as geoip from "geoip-lite";
import nanoid = require("nanoid");

import { IAnalyticsAttributes, logItemAddition } from "./analytics";
import * as article from "./article";
import * as book from "./book";
import { httpsFunction } from "./functions";
import * as video from "./video";

class File {
    private file;

    constructor(path: string) {
        this.file = admin.storage().bucket().file(path);
    }

    public read = async () => await json.decode((await this.file.download())[0]);

    public write = async (content: any) => await this.file.save(json.encode(content));
}

// This function is used exclusively by browser extensions.
export default httpsFunction(
    async ({ ip, query: { url } }: Request, response: Response, userId: string) => {
        let itemModule: {
            analyticsAttributes: IAnalyticsAttributes,
            convertUrlIntoItem: (url: string, options?: object) => Promise<any>,
            convertItemIntoId: (item: object) => string,
            storageDirectory: string,
        } = article;

        if (video.isValidUrl(url)) {
            itemModule = video;
        } else if (book.isValidUrl(url)) {
            itemModule = book;
        }

        const item = await itemModule.convertUrlIntoItem(
            url,
            { country: geoip.lookup(ip).country });

        if (!item.name) {
            throw new Error(`Invalid item is detected: ${item}`);
        }

        console.log("Item:", item);

        const file = new File(`/users/${userId}/${itemModule.storageDirectory}/todo`);
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

        await logItemAddition(itemModule.convertItemIntoId(item), itemModule.analyticsAttributes);

        response.send(item);
    }, { cacheSeconds: 0 });
