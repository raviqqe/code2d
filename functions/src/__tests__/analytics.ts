import { getTrendingItems } from "../analytics";

jest.mock("googleapis", () => ({
    analyticsreporting: () => ({
        reports: {
            batchGet: (_, callback: (error, result) => void) =>
                callback(null, { reports: [{ data: {} }] }),
        },
    }),
    auth: { JWT: () => ({ authorize: () => undefined }) },
}));

test("Handle undefined report rows", async () => {
    expect.assertions(1);

    expect(await getTrendingItems(0, () => Promise.resolve({ name: "itemName" }))).toEqual([]);
});
