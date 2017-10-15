import topSalesBooks, { getTopSalesBooks } from "../top-sales-books";

async function testTopSalesBooksFunction(ip: string, callback: (books: any[]) => void) {
    await topSalesBooks(
        { get: () => "headerContent", ip } as any,
        { send: callback, set: () => undefined } as any);
}

test("Get top sales books", async () => {
    expect.assertions(1);

    expect((await getTopSalesBooks()).length).toBeGreaterThan(10);
});

test("Get top sales books through a cloud function", async () => {
    expect.assertions(2);

    await testTopSalesBooksFunction(
        "219.114.161.59",
        (books) => expect(books.length).toBeGreaterThan(5));

    await testTopSalesBooksFunction(
        "47.88.32.46",
        (books) => expect(books.length).toBe(0));
});
