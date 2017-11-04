import is = require("is_js");

import { default as country } from "../country";

jest.setTimeout(20000);

test("Get countries of clients", async () => {
    expect.assertions(2);

    for (const [ip, code] of [
        ["115.36.27.16", "JP"],
        ["219.114.161.59", "US"],
    ]) {
        await country(
            {
                get: () => "headerContent",
                ip,
            } as any,
            {
                send: (code) => expect(code).toBe(code),
                set: () => undefined,
            } as any);
    }
});
