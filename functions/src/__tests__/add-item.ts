import is = require("is_js");

import { default as addItem } from "../add-item";

jest.setTimeout(20000);

test("Add items", async () => {
    expect.assertions(7);

    for (const url of [
        "https://martinfowler.com/bliki/MonolithFirst.html",
        "https://charlieharvey.org.uk/page/javascript_the_weird_parts",
        "https://www.youtube.com/watch?v=2V1FtfBDsLU&t=2s",
        "https://www.youtube.com/watch?v=vS5hct55p40",
        "https://books.rakuten.co.jp/rb/14920954/",
        "https://books.rakuten.co.jp/rb/15078428/",
        "https://www.betterworldbooks.com/Soft-Skills" +
        "--The-software-developer-s-life-manual-id-9781617292392.aspx",
    ]) {
        await addItem(
            {
                get: () => "headerContent",
                ip: "115.36.27.16",
                query: { url },
            } as any,
            {
                send: ({ name }) => expect(typeof name).toBe("string"),
                set: () => undefined,
            } as any);
    }
});
