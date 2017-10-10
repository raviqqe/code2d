import { convertIsbnIntoBook, convertUrlIntoIsbn, isValidUrl } from "../rakuten";
import { isIsbn } from "../utils";

jest.setTimeout(20000);

const urls = [
    "https://books.rakuten.co.jp/rb/14920954/",
    "https://books.rakuten.co.jp/rb/15078428/",
];

test("Convert URLs into ISBNs", async () => {
    expect.assertions(2);

    for (const url of urls) {
        expect(isIsbn(await convertUrlIntoIsbn(url))).toBe(true);
    }
});

test("Convert ISBNs into book objects", async () => {
    expect.assertions(2);

    for (const isbn of ["9784873117911", "9784774189673"]) {
        expect(typeof (await convertIsbnIntoBook(isbn))).toBe("object");
    }
});

test("Validate URLs", () => {
    for (const url of urls) {
        expect(isValidUrl(url)).toBe(true);
    }

    for (const url of [
        "https://amazon.co.jp",
        "https://www.betterworldbooks.com/it-id-1501142976.aspx",
    ]) {
        expect(isValidUrl(url)).toBe(false);
    }
});
