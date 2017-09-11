import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import * as amazon from "./amazon";

admin.initializeApp(functions.config().firebase);

export const books = functions.https.onRequest(
    async ({ query: { token } }: Request, response: Response) => {
        await admin.auth().verifyIdToken(token);

        response.set("Access-Control-Allow-Origin", "*");
        response.set("Access-Control-Allow-Methods", "GET, POST");
        response.send(await amazon.books());
    });
