import * as functions from "./functions";
import { IItem } from "./items";
import StatefulItemsRepository from "./stateful-items-repository";

export interface IBook extends IItem {
    author?: string;
    description?: string;
    image?: string;
    price?: string;
    publisher?: string;
    salesDate?: string;
    url?: string;
}

const repository = new StatefulItemsRepository<IBook>("books");

export const booksRepository = repository.state;

export async function urlToBook(url: string): Promise<IBook> {
    return await functions.call("book", { url });
}

export function extractBook<A extends IBook>({
        author, description, id, image, name, price, publisher, salesDate, url,
    }: A): IBook {
    return { author, description, id, image, name, price, publisher, salesDate, url };
}

export async function getTrendingBooks(): Promise<IBook[]> {
    return await functions.call("trendingBooks");
}
