import axios from "axios";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const cacheSeconds = 24 * 60 * 60;
const origins = functions.config().cors.origins.split(",");

export function httpsFunction(
    handler: (request: Request, response: Response, userId?: string) => void | Promise<void>,
    options: { noCache?: boolean } = {}) {
    return functions.https.onRequest(
        async (request: Request, response: Response) => {
            const origin = request.get("Origin");

            if (origins.includes(origin)) {
                response.set("Access-Control-Allow-Origin", origin);
            }

            response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            response.set("Access-Control-Allow-Headers", "Authorization");

            if (request.method === "OPTIONS") {
                response.end();
                return;
            }

            const { uid } = await admin.auth().verifyIdToken(
                request.get("Authorization").split(" ")[1]);

            const age = options.noCache ? 0 : cacheSeconds;
            response.set("Cache-Control", `private, max-age=${age}, s-maxage=${age}`);

            try {
                await handler(request, response, uid);
            } catch (error) {
                console.error(error);
                response.sendStatus(500);
            }
        });
}

export function urlToItemConverter<A extends { name: string }>(
    converter: (url: string, options?: object) => Promise<A>,
): (url: string, options?: object) => Promise<A> {
    return async (url: string, options: object = {}): Promise<A> => {
        const item = await converter(url, options);

        if (!item.name) {
            throw new Error(`Invalid item is detected: ${item}`);
        }

        return item;
    };
}

export function isIsbn(isbn: string): boolean {
    return typeof isbn === "string" && [10, 13].includes(isbn.length);
}
