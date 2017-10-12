import { Request, Response } from "express";
import * as geoip from "geoip-lite";

import * as amazon from "./amazon";
import * as betterWorldBooks from "./better-world-books";
import * as rakuten from "./rakuten";
import { httpsFunction, urlToItemConverter } from "./utils";

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

export const convertUrlIntoBook = urlToItemConverter(
    async (url: string, { country }: { country: string }): Promise<any> => {
        console.log("Country:", country);

        const isbn = await convertUrlIntoIsbn(url);

        return {
            ...(await (country === "JP" ? rakuten : betterWorldBooks).convertIsbnIntoBook(isbn)),
            isbn,
        };
    }, "AddBook", ({ isbn }) => isbn);

export default httpsFunction(async ({ ip, query: { url } }: Request, response: Response) => {
    response.send(await convertUrlIntoBook(url, { country: geoip.lookup(ip).country }));
});
