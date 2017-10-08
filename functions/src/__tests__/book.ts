import is = require("is_js");

import { convertUrlIntoBook } from "../book";

test("Convert a URL into a book object", async () => {
    expect.assertions(12);

    for (const url of [
        "https://books.rakuten.co.jp/rb/15092688/",
        "https://www.amazon.co.jp/gp/product/4873117143/ref=s9u_simh_gw_i2" +
        "?ie=UTF8&pd_rd_i=4873117143" +
        "&pd_rd_r=14eb393f-abcb-11e7-ab93-378794d3c17e" +
        "&pd_rd_w=EhfK6&pd_rd_wg=yjLAe&pf_rd_m=AN1VRQENFRJN5" +
        "&pf_rd_s=&pf_rd_r=6S1GM48Y0XW3X9GT3YHN&pf_rd_t=36701" +
        "&pf_rd_p=d4802771-73ad-49b1-a154-90aaec384d3e&pf_rd_i=desktop",
    ]) {
        const book = await convertUrlIntoBook(url);

        expect(typeof book.name).toBe("string");
        expect(book.title).toBeUndefined();
        expect(typeof book.author).toBe("string");
        expect(typeof book.publisher).toBe("string");
        expect(is.url(book.image)).toBe(true);
        expect(is.url(book.url)).toBe(true);
    }
});
