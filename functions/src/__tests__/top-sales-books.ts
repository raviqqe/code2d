import { getTopSalesBooks } from "../top-sales-books";

test("Get books", async () => {
    expect.assertions(1);

    expect((await getTopSalesBooks()).length).toBeGreaterThan(10);
});
