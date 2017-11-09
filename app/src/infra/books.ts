import { IBook } from "common/domain/book";

import * as functions from "./functions";
import storage from "./storage";

export const booksRepository = storage.statefulItemsRepository<IBook>("books");

export async function urlToBook(url: string): Promise<IBook> {
    return await functions.call("book", { params: { url } });
}

export async function getTrendingBooks(): Promise<IBook[]> {
    return await functions.call("trendingBooks");
}
