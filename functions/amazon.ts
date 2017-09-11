import * as apac from "apac";
import * as functions from "firebase-functions";

const amazonClient = new apac.OperationHelper({
    assocId: functions.config().aws.tag,
    awsId: functions.config().aws.id,
    awsSecret: functions.config().aws.secret,
    endPoint: "webservices.amazon.co.jp",
});

export async function books(): Promise<any[]> {
    const { result: { ItemSearchErrorResponse, ItemSearchResponse } }
        = await amazonClient.execute("ItemSearch", {
            BrowseNode: "466298",
            ResponseGroup: "Images,ItemAttributes",
            SearchIndex: "Books",
        });

    if (ItemSearchErrorResponse) {
        throw new Error(ItemSearchErrorResponse.Error.Message);
    }

    return ItemSearchResponse.Items.Item.map(({
        ASIN,
        DetailPageURL,
        SmallImage,
        ItemAttributes: { Author, Publisher, Title } }) => ({
            asin: ASIN,
            author: Author,
            imageUri: SmallImage.URL,
            pageUri: DetailPageURL,
            publisher: Publisher,
            title: Title,
        }));
}
