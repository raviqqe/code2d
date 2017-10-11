import is = require("is_js");

import { convertUrlIntoBook } from "../book";

jest.setTimeout(20000);

function validateBook({ author, image, name, publisher, title, url }): void {
    expect(typeof name).toBe("string");
    expect(title).toBeUndefined();
    expect(typeof author).toBe("string");
    expect(typeof publisher).toBe("string");
    expect(is.url(image)).toBe(true);
    expect(is.url(url)).toBe(true);
}

test("Convert URLs of English books into book objects", async () => {
    expect.assertions(12);

    for (const bookUrl of [
        "https://www.betterworldbooks.com/it-id-1501142976.aspx",
        "https://www.betterworldbooks.com/The-Power-of-Now-id-1577314808.aspx",
    ]) {
        validateBook(await convertUrlIntoBook(bookUrl));
    }
});

test("Convert URLs of Japanese books into book objects", async () => {
    expect.assertions(12);

    for (const bookUrl of [
        "https://books.rakuten.co.jp/rb/14920954/",
        "https://books.rakuten.co.jp/rb/15078428/",
    ]) {
        validateBook(await convertUrlIntoBook(bookUrl, { country: "JP" }));
    }
});
