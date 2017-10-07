import axios from "axios";
import { Response } from "express";

import { callApi } from "./rakuten";
import { httpsFunction } from "./utils";

export async function getBooks(): Promise<any[]> {
    return await callApi({ booksGenreId: "001005", sort: "sales" });
}

export default httpsFunction(async (_, response: Response) => {
    response.send(await getBooks());
});
