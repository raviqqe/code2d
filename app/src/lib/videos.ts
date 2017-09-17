import * as url from "url";

import * as functions from "./functions";
import { IItem } from "./items";
import StatefulItemsRepository from "./stateful_items_repository";

export interface IVideo extends IItem {
    description?: string;
    embedUri: string;
    publishedAt?: string;
    uri: string;
}

const repository = new StatefulItemsRepository<IVideo>("videos");

export const videosRepository = repository.state;

export async function uriToVideo(uri: string): Promise<IVideo> {
    const video = await functions.call("video", { uri });
    const { v } = url.parse(uri, true).query;

    return { embedUri: `https://www.youtube.com/embed/${v}`, name, uri, ...video };
}
