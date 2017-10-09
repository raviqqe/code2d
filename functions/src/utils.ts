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
    converter: (url: string) => Promise<A>,
    action: string): (url: string) => Promise<A> {
    return async (url: string): Promise<any> => {
        const item = await converter(url);

        if (!item.name) {
            throw new Error(`Invalid item is detected: ${item}`);
        }

        await axios.get("https://www.google-analytics.com/collect", {
            headers: {
                "User-Agent": (
                    "Mozilla/5.0 (X11; CrOS armv7l 9592.96.0) " +
                    "AppleWebKit/537.36 (KHTML, like Gecko) " +
                    "Chrome/60.0.3112.114 Safari/537.36"),
            },
            params: {
                cid: "backend", // Should be UUID v4.
                ea: action,
                ec: "User",
                el: url,
                t: "event",
                tid: functions.config().google.analytics.trackingid,
                v: 1,
            },
        });

        return item;
    };
}
