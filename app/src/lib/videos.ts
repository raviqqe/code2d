import { parse as parseUrl } from "url";

import * as functions from "./functions";
import { IItem } from "./items";
import StatefulItemsRepository from "./stateful-items-repository";

export interface IVideo extends IItem {
    description?: string;
    embedUrl: string;
    publishedAt?: string;
    url: string;
}

const repository = new StatefulItemsRepository<IVideo>("videos");

export const videosRepository = repository.state;

export async function urlToVideo(url: string): Promise<IVideo> {
    return await functions.call("video", { url });
}

export async function getTrendingVideos(): Promise<IVideo[]> {
    return await functions.call("trendingVideos");
}

export function extractVideo({ description, embedUrl, id, name, publishedAt, url }: IVideo): IVideo {
    return { description, embedUrl, id, name, publishedAt, url };
}
