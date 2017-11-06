import axios from "axios";
import { IArticle } from "common/domain/article";
import is = require("is_js");

import { convertIntoUrl, convertUrlIntoItem, extractTitle, trendingArticles } from "../article";

jest.setTimeout(20000);

const baseUrl = "https://foo.com";

function validateArticle({ id, name, url }: IArticle): void {
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
    expect(typeof name).toBe("string");
    expect(is.url(url)).toBe(true);
}

test("Convert URL-like strings into complete URLs", () => {
    expect(convertIntoUrl("/foo", baseUrl)).toBe("https://foo.com/foo");
    expect(convertIntoUrl(baseUrl, baseUrl)).toBe("https://foo.com");
});

test("Don't convert falsy values into URLs", () => {
    expect(convertIntoUrl(null, baseUrl)).toBe(null);
    expect(convertIntoUrl(undefined, baseUrl)).toBe(undefined);
});

test("Extract titles from HTML strings", async () => {
    expect.assertions(3);

    for (const { html, title } of [
        {
            html: "<html><head><title>apple</title></head><body>bad apple</body></html>",
            title: "apple",
        },
        {
            html: "<html>\n<head><title>   foo bar baz\n  </title></head><body></body></html>",
            title: "foo bar baz",
        },
        {
            html: (await axios.get("https://deepmind.com/blog/alphago-zero-learning-scratch/")).data,
            title: "AlphaGo Zero: Learning from scratch | DeepMind",
        },
    ]) {
        expect(extractTitle(html)).toBe(title);
    }
});

test("Convert a URL into an article object", async () => {
    expect.assertions(12);

    for (const articleUrl of [
        "https://martinfowler.com/bliki/MonolithFirst.html",
        "https://charlieharvey.org.uk/page/javascript_the_weird_parts",
    ]) {
        const article = await convertUrlIntoItem(articleUrl);

        validateArticle(article);
        expect(is.url(article.image)).toBe(true);
        expect(typeof article.text).toBe("string");
    }
});

test("Don't warn about no stopwards file for Japanese", async () => {
    expect.assertions(5);

    console.error = () => { throw new Error("Don't call console.error!"); };

    const article = await convertUrlIntoItem("https://note.mu/ruiu/n/n3378b4169ad8");

    validateArticle(article);
    expect(is.url(article.favicon)).toBe(true);
});

test("Fetch trending articles", async () => {
    expect.assertions(1);

    await trendingArticles(
        { get: () => "headerContent" } as any,
        {
            send: (articles) => expect(articles.length).toBeGreaterThan(1),
            set: () => undefined,
        } as any);
});

test("Unescape special characters in article titles", async () => {
    const { name } = await convertUrlIntoItem(
        "https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9");

    expect(name).toBe("CSS Modules & Sass in Create React App – Kirsten Swanson – Medium");
});
