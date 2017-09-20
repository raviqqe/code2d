import axios from "axios";
import { Request, Response } from "express";
import is = require("is_js");
import unfluff = require("unfluff");
import * as url from "url";

import { httpsFunction } from "./utils";

export function convertIntoUrl(urlOrPath: string, baseUrl: string): string {
    if (!urlOrPath || is.url(urlOrPath)) {
        return urlOrPath;
    }

    const { host, protocol } = url.parse(baseUrl);

    return url.format({ host, pathname: urlOrPath, protocol });
}

export default httpsFunction(async ({ query: { url } }: Request, response: Response) => {
    const { date, favicon, image, text, title } = unfluff((await axios.get(url)).data);

    const article = {
        date,
        favicon: convertIntoUrl(favicon, url),
        image: convertIntoUrl(image, url),
        name: title,
        text,
        url,
    };

    console.log("Article:", article);

    response.send(article);
});
