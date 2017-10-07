import axios from "axios";
import * as functions from "firebase-functions";

function convertItemIntoBook({
    affiliateUrl, author, itemCaption, itemPrice, largeImageUrl,
    publisherName, salesDate, title,
    }) {
    return {
        author,
        description: itemCaption,
        image: largeImageUrl,
        name: title,
        price: `¥${itemPrice}`,
        publisher: publisherName,
        salesDate,
        url: affiliateUrl,
    };
}

export async function callApi(query: object): Promise<any[]> {
    const { data: { Items } } = await axios.get(
        "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404",
        {
            params: {
                affiliateId: functions.config().rakuten.affiliate.id,
                applicationId: functions.config().rakuten.id,
                formatVersion: 2,
                ...query,
            },
        });

    return Items.map(convertItemIntoBook);
}
