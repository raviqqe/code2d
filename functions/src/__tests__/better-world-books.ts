import { convertIsbnIntoBook } from "../better-world-books";

jest.setTimeout(20000);

test("Convert ISBNs into book objects", async () => {
    expect.assertions(2);

    for (const isbn of ["1594633665", "1577314808"]) {
        const book = await convertIsbnIntoBook(isbn);
        expect(typeof book).toBe("object");
    }
});
