import { convertIntoUri } from "../article";

const baseUri = "https://foo.com";

test("Convert URI-like strings into complete URIs", () => {
    expect(convertIntoUri("/foo", baseUri)).toBe("https://foo.com/foo");
    expect(convertIntoUri(baseUri, baseUri)).toBe("https://foo.com");
});

test("Don't convert falsy values into URIs", () => {
    expect(convertIntoUri(null, baseUri)).toBe(null);
    expect(convertIntoUri(undefined, baseUri)).toBe(undefined);
});
