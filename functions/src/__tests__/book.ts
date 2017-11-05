import { IBook } from "common/domain/book";
import is = require("is_js");

import { convertUrlIntoItem, trendingBooks } from "../book";
import { isIsbn } from "../utils";

jest.setTimeout(20000);

function validateBook({ author, id, image, isbn, name, publisher, url }: IBook): void {
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
    expect(typeof name).toBe("string");
    expect(typeof author).toBe("string");
    expect(typeof publisher).toBe("string");
    expect(is.url(image)).toBe(true);
    expect(isIsbn(isbn)).toBe(true);
    expect(is.url(url)).toBe(true);
}

test("Convert URLs of books into book objects in US", async () => {
    expect.assertions(2 * 8);

    for (const bookUrl of [
        "https://www.betterworldbooks.com/it-id-1501142976.aspx",
        "https://www.betterworldbooks.com/The-Power-of-Now-id-1577314808.aspx",
    ]) {
        validateBook(await convertUrlIntoItem(bookUrl, { country: "US" }));
    }
});

test("Convert URLs of books into book objects in Japan", async () => {
    expect.assertions(4 * 8);

    for (const bookUrl of [
        "https://books.rakuten.co.jp/rb/14920954/",
        "https://books.rakuten.co.jp/rb/15078428/",
        "https://www.betterworldbooks.com/Soft-Skills" +
        "--The-software-developer-s-life-manual-id-9781617292392.aspx",
        "https://www.amazon.co.jp/gp/product/4861009782",
    ]) {
        validateBook(await convertUrlIntoItem(bookUrl, { country: "JP" }));
    }
});

test("Fetch trending books", async () => {
    expect.assertions(1);

    await trendingBooks(
        { get: () => "headerContent", ip: "219.114.161.59" } as any,
        {
            send: (books) => expect(books.length).toBeGreaterThan(1),
            set: () => undefined,
        } as any);
});
