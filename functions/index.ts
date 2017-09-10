import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

export const books = functions.https.onRequest(async (request: Request, response: Response) => {
    await admin.auth().verifyIdToken(request.query.token);

    // TODO: Fetch books.
});
