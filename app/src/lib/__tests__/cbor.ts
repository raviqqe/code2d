import * as cbor from "../cbor";

it("encodes and decodes objects", async () => {
    expect.assertions(1);
    const x = [{ foo: 123, bar: { foo: true } }];
    expect(await cbor.decode(cbor.encode(x))).toEqual(x);
});
