import axios from "axios";
import * as functions from "firebase-functions";

export async function callApi(query: object): Promise<any> {
    return (await axios.get(
        "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404",
        {
            params: {
                affiliateId: functions.config().rakuten.affiliate.id,
                applicationId: functions.config().rakuten.id,
                formatVersion: 2,
                ...query,
            },
        })).data;
}
