import { convertIsbnIntoBook, convertUrlIntoIsbn, isValidUrl } from "../better-world-books";
import { isIsbn } from "../utils";

jest.setTimeout(20000);

const urls = [
    "https://www.betterworldbooks.com/it-id-1501142976.aspx",
    "https://www.betterworldbooks.com/The-Power-of-Now-id-1577314808.aspx",
];

test("Convert URLs into ISBNs", async () => {
    expect.assertions(2);

    for (const url of urls) {
        expect(isIsbn(await convertUrlIntoIsbn(url))).toBe(true);
    }
});

test("Convert ISBNs into book objects", async () => {
    expect.assertions(2);

    for (const isbn of ["1501142976", "1577314808"]) {
        expect(typeof (await convertIsbnIntoBook(isbn))).toBe("object");
    }
});

test("Validate URLs", () => {
    for (const url of urls) {
        expect(isValidUrl(url)).toBe(true);
    }

    for (const url of [
        "https://amazon.co.jp",
        "https://wwww.betterworldbooks.com/it-id-1501142976.aspx",
    ]) {
        expect(isValidUrl(url)).toBe(false);
    }
});
