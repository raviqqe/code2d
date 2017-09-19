import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import * as amazon from "./amazon";
import { httpsFunction } from "./utils";
import * as youtube from "./youtube";

admin.initializeApp(functions.config().firebase);

export { default as article } from "./article";

export const books = httpsFunction(async (_, response: Response) => {
    response.send(await amazon.books());
});

export const video = httpsFunction(async ({ query: { uri } }: Request, response: Response) => {
    const { description, publishedAt, title } = await youtube.getVideoDetails(uri);

    console.log("Video:", { description, publishedAt, title });

    response.send({ name: title, description, publishedAt });
});
