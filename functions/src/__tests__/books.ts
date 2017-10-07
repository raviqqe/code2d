import { getBooks } from "../books";

test("Get books", async () => {
    expect.assertions(1);

    expect((await getBooks()).length).toBeGreaterThan(10);
});
