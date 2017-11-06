import * as msgpack from "msgpack-lite";

export function encode(x: any): Buffer {
    return msgpack.encode(x);
}

export function decode(buffer: Buffer): any {
    return msgpack.decode(buffer);
}
