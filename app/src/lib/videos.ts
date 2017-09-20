import { parse as parseUrl } from "url";

import * as functions from "./functions";
import { IItem } from "./items";
import StatefulItemsRepository from "./stateful_items_repository";

export interface IVideo extends IItem {
    description?: string;
    embedUrl: string;
    publishedAt?: string;
    url: string;
}

const repository = new StatefulItemsRepository<IVideo>("videos");

export const videosRepository = repository.state;

export async function urlToVideo(url: string): Promise<IVideo> {
    const video = await functions.call("video", { url });
    const { v } = parseUrl(url, true).query;

    return { embedUrl: `https://www.youtube.com/embed/${v}`, name, url, ...video };
}
