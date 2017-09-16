import * as functions from "./functions";
import { IItem } from "./items";
import StatefulItemsRepository from "./stateful_items_repository";

export interface IArticle extends IItem {
    date?: string;
    favicon?: string;
    image?: string;
    text?: string;
    uri: string;
}

const repository = new StatefulItemsRepository<IArticle>("articles");

export const articlesRepository = repository.state;

export async function uriToArticle(uri: string): Promise<IArticle> {
    return await functions.call("article", { uri });
}
