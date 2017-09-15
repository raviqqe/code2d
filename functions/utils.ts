import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const cacheSeconds = 24 * 60 * 60;
const origins = functions.config().cors.origins.split(",");

export function httpsFunction(handler: (request: Request, response: Response) => void | Promise<void>) {
    return functions.https.onRequest(
        async (request: Request, response: Response) => {
            const origin = request.get("Origin");

            if (origins.includes(request.get("Origin"))) {
                response.set("Access-Control-Allow-Origin", origin);
            }

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

            try {
                await handler(request, response);
            } catch (error) {
                console.error(error);
                response.sendStatus(500);
            }
        });
}
