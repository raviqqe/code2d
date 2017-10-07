import is = require("is_js");

import { convertUrlIntoBook } from "../book";

test("Convert a URL into a book object", async () => {
    expect.assertions(6);

    const book = await convertUrlIntoBook("https://books.rakuten.co.jp/rb/15092688/");

    expect(typeof book.name).toBe("string");
    expect(book.title).toBeUndefined();
    expect(typeof book.author).toBe("string");
    expect(typeof book.publisher).toBe("string");
    expect(is.url(book.image)).toBe(true);
    expect(is.url(book.url)).toBe(true);
});
