import { Request, Response } from "express";

export function config() {
    return {
        aws: {
            id: "accessKeyId",
            secret: "accessKeySecret",
            tag: "associateId",
        },
        cors: {
            origins: "http://localhost,https://foo.com",
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
