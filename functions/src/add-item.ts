import { addItemToItems } from "common/domain/item";
import * as database from "common/infra/database";
import * as json from "common/infra/json";
import * as storage from "common/infra/storage";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as geoip from "geoip-lite";

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
            itemsName: storage.ItemsName,
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

        const file = new File(storage.itemsPath(itemModule.itemsName, false, userId));
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

        await file.write(addItemToItems(items, item));
        await admin.database().ref(database.storagePath(userId)).set(
            { updatedItems: itemModule.itemsName, timestamp: Date.now() });

        await logItemAddition(itemModule.convertItemIntoId(item), itemModule.analyticsAttributes);

        response.send(item);
    }, { cacheSeconds: 0 });
