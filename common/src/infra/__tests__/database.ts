import { storagePath } from "../database";

test("Generate realtime database path for items update", () => {
    expect(storagePath("userId")).toBe("/users/userId/storage");
});
