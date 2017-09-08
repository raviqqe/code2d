import * as json from "../json";

it("encodes and decodes objects", async () => {
    expect.assertions(1);
    const x = [{ foo: 123, bar: { foo: true } }];
    expect(await json.decode(json.encode(x))).toEqual(x);
});
