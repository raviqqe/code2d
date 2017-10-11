import { Request, Response } from "express";
import * as functions from "firebase-functions";
import googleApis = require("googleapis");

import { httpsFunction } from "./utils";

const config = functions.config().google.analytics;

const jwtClient = new googleApis.auth.JWT(
    config.serviceaccount.email,
    null,
    config.serviceaccount.key,
    ["https://www.googleapis.com/auth/analytics.readonly"],
    null,
);

jwtClient.authorize((error) => {
    if (error) {
        throw error;
    }

    googleApis.options({ auth: jwtClient });
});

export default httpsFunction((_, response: Response) => {
    googleApis.analyticsreporting("v4").reports.batchGet(
        {
            headers: { "Content-Type": "application/json" },
            resource: { reportRequests: [{ viewId: config.viewid }] },
        },
        (error, result) => {
            if (error) {
                throw error;
            }

            response.send(result);
        },
    );
});
