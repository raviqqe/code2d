import { IBook } from "common/domain/book";
import { sleep } from "common/utils";
import { Request, Response } from "express";

import * as amazon from "./amazon";
import { getTrendingItems, IAnalyticsAttributes } from "./analytics";
import * as betterWorldBooks from "./better-world-books";
import { httpsFunction, trendingItemsFunction, urlToItemFunction } from "./functions";
import * as rakuten from "./rakuten";
import { convertIpIntoCountry, urlToItemConverter } from "./utils";

export const analyticsAttributes: IAnalyticsAttributes = {
    action: "AddBook",
    dimension: 3,
};

export const storageDirectory = "books";

export function isValidUrl(url: string): boolean {
    for (const provider of [amazon, betterWorldBooks, rakuten]) {
        if (provider.isValidUrl(url)) {
            return true;
        }
    }

    return false;
}

export function convertItemIntoId({ isbn }): string {
    return isbn;
}

async function convertUrlIntoIsbn(url: string): Promise<string> {
    let convert = null;

    for (const provider of [amazon, betterWorldBooks, rakuten]) {
        if (provider.isValidUrl(url)) {
            convert = provider.convertUrlIntoIsbn;
            break;
        }
    }

    if (!convert) {
        throw new Error(`Invalid book URL: ${url}`);
    }

    return await convert(url);
}

export async function convertIsbnIntoBook(isbn: string, country: string): Promise<IBook> {
    return await (country === "JP" ? rakuten : betterWorldBooks).convertIsbnIntoBook(isbn);
}

export const convertUrlIntoItem = urlToItemConverter(
    async (url: string, { country }: { country: string }): Promise<IBook> => {
        console.log("Country:", country);

        const isbn = await convertUrlIntoIsbn(url);

        return await convertIsbnIntoBook(isbn, country);
    });

export const book = urlToItemFunction(
    convertUrlIntoItem,
    { analyticsAttributes, itemToId: ({ isbn }) => isbn });

export const trendingBooks = trendingItemsFunction(async ({ ip }: Request, response: Response) => {
    response.send(await getTrendingItems(
        analyticsAttributes.dimension,
        async (isbn: string) => {
            await sleep(400); // Supress request burst.
            return await convertIsbnIntoBook(isbn, convertIpIntoCountry(ip));
        },
        { sequential: true }));
});
