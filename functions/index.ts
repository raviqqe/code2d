import axios from "axios";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import unfluff = require("unfluff");

import * as amazon from "./amazon";
import { httpsFunction } from "./utils";

admin.initializeApp(functions.config().firebase);

export const article = httpsFunction(async ({ query: { uri } }: Request, response: Response) => {
    const { date, favicon, image, text, title } = unfluff((await axios.get(uri)).data);
    const article = { date, favicon, image, name: title, text, uri };

    console.log("Article:", article);

    response.send(article);
});

export const books = httpsFunction(async (_, response: Response) => {
    response.send(await amazon.books());
});
