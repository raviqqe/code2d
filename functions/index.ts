import axios from "axios";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import unfluff = require("unfluff");

import * as amazon from "./amazon";

const cacheSeconds = 24 * 60 * 60;

admin.initializeApp(functions.config().firebase);

export const article = httpsFunction(async ({ query: { uri } }: Request, response: Response) => {
    const { title } = unfluff((await axios.get(uri)).data);
    const article = { title, uri };

    console.log("Article:", article);

    response.send(article);
});

export const books = httpsFunction(async (_, response: Response) => {
    response.send(await amazon.books());
});

function httpsFunction(handler: (request: Request, response: Response) => void | Promise<void>) {
    return functions.https.onRequest(
        async (request: Request, response: Response) => {
            response.set("Access-Control-Allow-Origin", "*");
            response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            response.set("Access-Control-Allow-Headers", "Authorization");

            if (request.method === "OPTIONS") {
                response.end();
                return;
            }

            await admin.auth().verifyIdToken(request.get("Authorization").split(" ")[1]);

            response.set(
                "Cache-Control",
                `private, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}`);

            await handler(request, response);
        });
}
