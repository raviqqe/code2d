import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import * as amazon from "./amazon";

const cacheSeconds = 24 * 60 * 60;

admin.initializeApp(functions.config().firebase);

export const books = functions.https.onRequest(
    async ({ query: { token } }: Request, response: Response) => {
        await admin.auth().verifyIdToken(token);

        response.set("Access-Control-Allow-Origin", "*");
        response.set("Access-Control-Allow-Methods", "GET, POST");
        response.set(
            "Cache-Control",
            `private, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}`);
        response.send(await amazon.books());
    });
