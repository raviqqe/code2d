export function initializeApp() {
    return;
}

export function auth() {
    return {
        currentUser: { delete: () => undefined, uid: "testUid" },
        onAuthStateChanged: () => undefined,
        signOut: () => undefined,
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
