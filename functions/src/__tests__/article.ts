import is = require("is_js");

import { convertIntoUrl, convertUrlIntoItem, extractTitle, trendingArticles } from "../article";

jest.setTimeout(20000);

const baseUrl = "https://foo.com";

test("Convert URL-like strings into complete URLs", () => {
    expect(convertIntoUrl("/foo", baseUrl)).toBe("https://foo.com/foo");
    expect(convertIntoUrl(baseUrl, baseUrl)).toBe("https://foo.com");
});

test("Don't convert falsy values into URLs", () => {
    expect(convertIntoUrl(null, baseUrl)).toBe(null);
    expect(convertIntoUrl(undefined, baseUrl)).toBe(undefined);
});

test("Extract titles from HTML strings", () => {
    for (const { html, title } of [
        {
            html: "<html><head><title>apple</title></head><body>bad apple</body></html>",
            title: "apple",
        },
        {
            html: "<html>\n<head><title>   foo bar baz\n  </title></head><body></body></html>",
            title: "foo bar baz",
        },
    ]) {
        expect(extractTitle(html)).toBe(title);
    }
});

test("Convert a URL into an article object", async () => {
    expect.assertions(8);

    for (const articleUrl of [
        "https://martinfowler.com/bliki/MonolithFirst.html",
        "https://charlieharvey.org.uk/page/javascript_the_weird_parts",
    ]) {
        const { date, favicon, image, name, text, url }
            = await convertUrlIntoItem(articleUrl);

        expect(is.url(image)).toBe(true);
        expect(typeof name).toBe("string");
        expect(typeof text).toBe("string");
        expect(is.url(url)).toBe(true);
    }
});

test("Fetch trending articles", async () => {
    expect.assertions(1);

    await trendingArticles(
        { get: () => "headerContent" } as any,
        {
            send: (articles) => expect(articles.length).toBeGreaterThan(5),
            set: () => undefined,
        } as any);
});
