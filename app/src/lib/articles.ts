import * as functions from "./functions";
import StatefulItemsRepository from "./stateful_items_repository";

export interface IArticle {
    date?: string;
    favicon?: string;
    image?: string;
    name: string;
    text?: string;
    uri: string;
}

const repository = new StatefulItemsRepository<IArticle>("articles");

export const articlesRepository = repository.state;

export async function uriToArticle(uri: string): Promise<IArticle> {
    return await functions.call("article", { uri });
}
