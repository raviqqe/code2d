export function initializeApp() {
    return;
}

export function auth() {
    return {
        currentUser: { uid: "testUid" },
        onAuthStateChanged: () => undefined,
    };
}

export function storage() {
    return {
        ref: (path: string) => ({
            getDownloadURL: () => "testUrl",
            putString: (data: string) => undefined,
        }),
    };
}
