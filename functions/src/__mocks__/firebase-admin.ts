export function auth() {
    return {
        verifyIdToken: () => ({ uid: "testUid" }),
    };
}

export function storage() {
    return {
        bucket: () => ({
            file: () => ({
                download: () => [new Uint8Array([0x90])],
                save: () => undefined,
            }),
        }),
    };
}

export function database() {
    return {
        ref: () => ({
            set: () => undefined,
        }),
    };
}
