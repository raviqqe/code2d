import { IArticle } from "common/domain/article";

import * as functions from "./functions";
import storage from "./storage";

export const articlesRepository = storage.statefulItemsRepository<IArticle>("articles");

export async function urlToArticle(url: string): Promise<IArticle> {
    return await functions.call("article", { params: { url } });
}

export async function getTrendingArticles(): Promise<IArticle[]> {
    return await functions.call("trendingArticles");
}
