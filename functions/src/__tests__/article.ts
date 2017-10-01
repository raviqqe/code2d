import { convertIntoUrl } from "../article";

const baseUrl = "https://foo.com";

test("Convert URL-like strings into complete URLs", () => {
    expect(convertIntoUrl("/foo", baseUrl)).toBe("https://foo.com/foo");
    expect(convertIntoUrl(baseUrl, baseUrl)).toBe("https://foo.com");
});

test("Don't convert falsy values into URLs", () => {
    expect(convertIntoUrl(null, baseUrl)).toBe(null);
    expect(convertIntoUrl(undefined, baseUrl)).toBe(undefined);
});
