import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const books = functions.https.onRequest((request: Request, response: Response) => {
    // TODO: Fetch books.
});
