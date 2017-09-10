import * as apac from "apac";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const config = functions.config();

admin.initializeApp(functions.config().firebase);
const amazonClient = new apac.OperationHelper({
    assocId: config.aws.tag,
    awsId: config.aws.id,
    awsSecret: config.aws.secret,
});

export const books = functions.https.onRequest(async (request: Request, response: Response) => {
    await admin.auth().verifyIdToken(request.query.token);

    // TODO: Fetch books.
});
