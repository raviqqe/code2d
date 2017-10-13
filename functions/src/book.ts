import { Request, Response } from "express";
import * as geoip from "geoip-lite";

import * as amazon from "./amazon";
import { getTrendingItems, IAnalyticsAttributes } from "./analytics";
import * as betterWorldBooks from "./better-world-books";
import * as rakuten from "./rakuten";
import { httpsFunction, urlToItemConverter } from "./utils";

const analyticsAttributes: IAnalyticsAttributes = {
    action: "AddBook",
    dimension: 3,
};

export function isValidUrl(url: string): boolean {
    for (const provider of [amazon, betterWorldBooks, rakuten]) {
        if (provider.isValidUrl(url)) {
            return true;
        }
    }

    return false;
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

export async function convertIsbnIntoBook(isbn: string, country: string): Promise<any> {
    return {
        ...(await (country === "JP" ? rakuten : betterWorldBooks).convertIsbnIntoBook(isbn)),
        isbn,
    };
}

function convertIpIntoCountry(ip: string): string {
    return geoip.lookup(ip).country;
}

export const convertUrlIntoBook = urlToItemConverter(
    async (url: string, { country }: { country: string }): Promise<any> => {
        console.log("Country:", country);

        const isbn = await convertUrlIntoIsbn(url);

        return await convertIsbnIntoBook(isbn, country);
    }, analyticsAttributes, ({ isbn }) => isbn);

export const book = httpsFunction(async ({ ip, query: { url } }: Request, response: Response) => {
    response.send(await convertUrlIntoBook(url, { country: convertIpIntoCountry(ip) }));
});

export const trendingBooks = httpsFunction(async ({ ip }: Request, response: Response) => {
    response.send(await getTrendingItems(
        analyticsAttributes.dimension,
        async (isbn: string) => await convertIsbnIntoBook(isbn, convertIpIntoCountry(ip)),
        { sequential: true }));
});
