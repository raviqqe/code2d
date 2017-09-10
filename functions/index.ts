import * as amazon from "amazon-product-api";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const config = functions.config();

admin.initializeApp(functions.config().firebase);
const amazonClient = amazon.createClient({
    awsId: config.aws.id,
    awsSecret: config.aws.secret,
    awsTag: config.aws.tag,
});

export const books = functions.https.onRequest(async (request: Request, response: Response) => {
    await admin.auth().verifyIdToken(request.query.token);

    // TODO: Fetch books.
});
