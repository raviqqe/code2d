import is = require("is_js");

import { convertUrlIntoItem } from "../video";

jest.setTimeout(20000);

test("Convert URLs into video objects", async () => {
    expect.assertions(2 * 5);

    for (const videoUrl of [
        "https://www.youtube.com/watch?v=2V1FtfBDsLU&t=2s",
        "https://www.youtube.com/watch?v=vS5hct55p40",
    ]) {
        const { description, embedUrl, name, publishedAt, url }
            = await convertUrlIntoItem(videoUrl);

        expect(typeof name).toBe("string");
        expect(typeof description).toBe("string");
        expect(is.url(embedUrl)).toBe(true);
        expect(typeof publishedAt).toBe("string");
        expect(is.url(url)).toBe(true);
    }
});
