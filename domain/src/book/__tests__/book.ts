import { convertLocaleIntoBookStoreUrl } from "..";

test("Convert locale into book store URL", () => {
    expect(convertLocaleIntoBookStoreUrl("JP", ["ja-JP"])).toMatch(/rakuten/);
    expect(convertLocaleIntoBookStoreUrl("US", ["ja-JP"])).toMatch(/betterworldbooks/);
    expect(convertLocaleIntoBookStoreUrl("JP", ["en-US"])).toMatch(/betterworldbooks/);
    expect(convertLocaleIntoBookStoreUrl("US", ["en-US"])).toMatch(/betterworldbooks/);
});
