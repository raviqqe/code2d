import axios from "axios";
import * as functions from "firebase-functions";
import googleApis = require("googleapis");
import * as _ from "lodash";

const config = functions.config().google.analytics;

export interface IAnalyticsAttributes {
    action: "AddArticle" | "AddVideo" | "AddBook";
    dimension: 1 | 2 | 3;
}

export function initialize(): void {
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
}

function getDate(date: Date): string {
    const format = (n: number) => _.padStart(n.toString(), 2, "0");

    return (
        date.getUTCFullYear() + "-" +
        format(date.getUTCMonth() + 1) + "-" +
        format(date.getUTCDate()));
}

export async function getTrendingItems(
    dimension: number,
    idToItem: (id: string) => Promise<object>,
    options: { sequential?: boolean } = {},
): Promise<object[]> {
    let { reports: [{ data: { rows } }] } = await new Promise((resolve, reject) =>
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
                        orderBys: [{
                            fieldName: "ga:hits",
                            sortOrder: "DESCENDING",
                        }],
                        viewId: config.viewid,
                    }],
                },
            },
            (error, result) => error ? reject(error) : resolve(result),
        )) as any;

    const rowToItem = async ({ dimensions: [id] }): Promise<object | null> => {
        try {
            return await idToItem(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    rows = rows.slice(0, 25);
    let items = [];

    if (options.sequential) {
        for (const row of rows) {
            items.push(await rowToItem(row));
        }
    } else {
        items = await Promise.all(rows.map(rowToItem));
    }

    return items.filter((item) => !!item);
}

export async function logItemAddition(value: string, { action, dimension }: IAnalyticsAttributes): Promise<void> {
    const params = {
        cid: "backend", // Should be UUID v4.
        ea: action,
        ec: "User",
        t: "event",
        tid: functions.config().google.analytics.trackingid,
        v: 1,
    };

    params[`cd${dimension}`] = value;

    await axios.get("https://www.google-analytics.com/collect", { params });
}
