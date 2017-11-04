import { Request, Response } from "express";

import { httpsFunction } from "./functions";
import { convertIpIntoCountry } from "./utils";

export default httpsFunction(({ ip }: Request, response: Response) => {
    response.send(convertIpIntoCountry(ip));
});
