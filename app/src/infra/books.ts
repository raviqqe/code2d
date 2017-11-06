import { IBook } from "common/domain/book";

import * as functions from "./functions";
import StatefulItemsRepository from "./stateful-items-repository";

const repository = new StatefulItemsRepository<IBook>("books");

export const booksRepository = repository.state;

export async function urlToBook(url: string): Promise<IBook> {
    return await functions.call("book", { params: { url } });
}

export async function getTrendingBooks(): Promise<IBook[]> {
    return await functions.call("trendingBooks");
}
