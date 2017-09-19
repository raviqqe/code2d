import axios from "axios";
import { Request, Response } from "express";
import is = require("is_js");
import unfluff = require("unfluff");
import * as url from "url";

import { httpsFunction } from "./utils";

export function convertIntoUri(uriOrPath: string, baseUri: string): string {
    if (!uriOrPath || is.url(uriOrPath)) {
        return uriOrPath;
    }

    const { host, protocol } = url.parse(baseUri);

    return url.format({ host, pathname: uriOrPath, protocol });
}

export default httpsFunction(async ({ query: { uri } }: Request, response: Response) => {
    const { date, favicon, image, text, title } = unfluff((await axios.get(uri)).data);

    const article = {
        date,
        favicon: convertIntoUri(favicon, uri),
        image: convertIntoUri(image, uri),
        name: title,
        text,
        uri,
    };

    console.log("Article:", article);

    response.send(article);
});
