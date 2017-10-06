import { convertUrlIntoBook } from "../book";

test("Convert a URL into a book object", async () => {
    expect.assertions(2);

    const book = await convertUrlIntoBook("https://books.rakuten.co.jp/rb/15092688/");

    expect(typeof book.name).toBe("string");
    expect(book.title).toBeUndefined();
});
