import * as functions from "./functions";
import { IItem } from "./items";
import StatefulItemsRepository from "./stateful-items-repository";

export interface IArticle extends IItem {
    date?: string;
    favicon?: string;
    image?: string;
    text?: string;
    url: string;
}

const repository = new StatefulItemsRepository<IArticle>("articles");

export const articlesRepository = repository.state;

export async function urlToArticle(url: string): Promise<IArticle> {
    return await functions.call("article", { params: { url } });
}

export async function getTrendingArticles(): Promise<IArticle[]> {
    return await functions.call("trendingArticles");
}

export function extractArticle({ date, favicon, id, image, name, text, url }: IArticle): IArticle {
    return { date, favicon, id, image, name, text, url };
}
