import { IArticle } from "common/domain/article";

import * as functions from "./functions";
import StatefulItemsRepository from "./stateful-items-repository";

const repository = new StatefulItemsRepository<IArticle>("articles");

export const articlesRepository = repository.state;

export async function urlToArticle(url: string): Promise<IArticle> {
    return await functions.call("article", { params: { url } });
}

export async function getTrendingArticles(): Promise<IArticle[]> {
    return await functions.call("trendingArticles");
}
