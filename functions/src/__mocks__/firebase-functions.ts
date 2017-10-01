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
        youtube: {
            key: "serverKey",
        },
    };
}

export const https = {
    onRequest: (handler: (request: Request, response: Response) => void) => handler,
};
