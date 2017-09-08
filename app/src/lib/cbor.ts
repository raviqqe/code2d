import * as cbor from "cbor";

export function encode(x: any): string {
    return cbor.encode(x).toString("binary");
}

export async function decode(s: string): Promise<any> {
    return await cbor.decodeFirst(new Buffer(s, "binary"));
}
