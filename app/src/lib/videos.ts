import * as url from "url";

import { IItem } from "./items";
import StatefulItemsRepository from "./stateful_items_repository";

export interface IVideo extends IItem {
    embedUri: string;
    uri: string;
}

const repository = new StatefulItemsRepository<IVideo>("videos");

export const videosRepository = repository.state;

export function uriToVideo(uri: string): IVideo {
    const { v } = url.parse(uri, true).query;

    return { embedUri: `https://www.youtube.com/embed/${v}`, name: uri, uri };
}
