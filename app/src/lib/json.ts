import * as msgpack from "msgpack-lite";

export function encode(x: any): string {
    return msgpack.encode(x).toString("binary");
}

export async function decode(s: string): Promise<any> {
    return await msgpack.decode(new Buffer(s, "binary"));
}
