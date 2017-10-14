import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import { IAnalyticsAttributes, logItemAddition } from "./analytics";
import { convertIpIntoCountry } from "./utils";

const cacheSeconds = 24 * 60 * 60;
const origins = functions.config().cors.origins.split(",");

export function httpsFunction(
    handler: (request: Request, response: Response, userId?: string) => void | Promise<void>,
    options: { cacheSeconds?: number } = {}) {
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

            const age = typeof options.cacheSeconds === "number"
                ? options.cacheSeconds
                : cacheSeconds;
            response.set("Cache-Control", `private, max-age=${age}, s-maxage=${age}`);

            try {
                await handler(request, response, uid);
            } catch (error) {
                console.error(error);
                response.sendStatus(500);
            }
        });
}

export function urlToItemFunction(
    convertUrlIntoItem: (url: string, opitons?: { country?: string }) => Promise<object>,
    options: { itemToId?: (item) => string, analyticsAttributes: IAnalyticsAttributes }) {
    return httpsFunction(async ({ ip, query: { url } }: Request, response: Response) => {
        const item = await convertUrlIntoItem(url, { country: convertIpIntoCountry(ip) });

        await logItemAddition(
            (options.itemToId || (({ url }) => url))(item),
            options.analyticsAttributes);

        response.send(item);
    });
}
