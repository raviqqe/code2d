import { convertCountryIntoBookStoreUrl } from "..";

test("Convert locale into book store URL", () => {
    expect(convertCountryIntoBookStoreUrl("JP")).toMatch(/rakuten/);
    expect(convertCountryIntoBookStoreUrl("US")).toMatch(/betterworldbooks/);
});
