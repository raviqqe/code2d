import { Request, Response } from "express";

export function config() {
    return {
        cors: {
            origins: "https://foo.com,http://bar.com",
        },
        google: {
            analytics: {
                trackingid: "UA-46057780-4",
            },
        },
        rakuten: {
            affiliate: {
                id: "1612f82a.a5051d07.1612f82b.6030f61b",
            },
            id: "1039965413641166178",
        },
        youtube: {
            key: "serverKey",
        },
    };
}

export const https = {
    onRequest: (handler: (request: Request, response: Response) => void) => handler,
};
