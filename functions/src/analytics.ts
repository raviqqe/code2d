import * as functions from "firebase-functions";
import googleApis = require("googleapis");

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

function getDate(date: Date): string {
    return date.getUTCFullYear() + "-" + date.getUTCMonth + "-" + date.getUTCDate();
}

export async function getTrendingItems(dimension: number) {
    return await new Promise((resolve, reject) =>
        googleApis.analyticsreporting("v4").reports.batchGet(
            {
                headers: { "Content-Type": "application/json" },
                resource: {
                    reportRequests: [{
                        dateRanges: [{
                            endDate: getDate(new Date()),
                            startDate: getDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
                        }],
                        dimensions: [{ name: `ga:dimension${dimension}` }],
                        metrics: [{ expression: "ga:hits" }],
                        viewId: config.viewid,
                    }],
                },
            },
            (error, result) => error ? reject(error) : resolve(result),
        ));
}
