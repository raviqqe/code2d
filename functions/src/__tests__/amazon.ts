import { convertUrlIntoIsbn, isValidUrl } from "../amazon";
import { isIsbn } from "../utils";

jest.setTimeout(20000);

const urls = [
    "https://www.amazon.co.jp/gp/product/4873114284",
    "https://www.amazon.co.jp/gp/product/4861009782",
    "https://www.amazon.co.jp/Pragmatic-Programmer-Journeyman-Master/dp/020161622X",
];

test("Convert URLs into ISBNs", async () => {
    expect.assertions(3);

    for (const url of urls) {
        expect(isIsbn(await convertUrlIntoIsbn(url))).toBe(true);
    }
});

test("Validate URLs", () => {
    for (const url of urls) {
        expect(isValidUrl(url)).toBe(true);
    }

    for (const url of [
        "https://amazoon.co.jp",
        "http://amazonco.jp",
        "https://aws.amazon.com/blogs",
    ]) {
        expect(isValidUrl(url)).toBe(false);
    }
});
