import { IItem } from "./items";
import StatefulItemsRepository from "./stateful_items_repository";

export interface IVideo extends IItem {
    uri: string;
}

const repository = new StatefulItemsRepository<IVideo>("videos");

export const videosRepository = repository.state;

export function uriToVideo(uri: string): IVideo {
    return { name: uri, uri };
}
