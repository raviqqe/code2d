import axios from "axios";
import { Request, Response } from "express";

import { httpsFunction } from "./functions";
import { callApi } from "./rakuten";
import { convertIpIntoCountry } from "./utils";

const filteredWords: string[] = ["LINE", "Twitter", "年賀状", "撮影"];

export async function getTopSalesBooks(): Promise<any[]> {
    return (await callApi("Book", { booksGenreId: "001005", sort: "sales" }))
        .filter(({ name }) => !filteredWords.some((pattern) => name.includes(pattern)));
}

export default httpsFunction(async ({ ip }: Request, response: Response) => {
    response.send(convertIpIntoCountry(ip) === "JP" ? await getTopSalesBooks() : []);
});
