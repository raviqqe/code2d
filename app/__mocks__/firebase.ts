export let signInFail = false;

export function initializeApp() {
    return;
}

export function auth() {
    return {
        currentUser: { delete: () => undefined, getIdToken: () => "testJwt", uid: "testUid" },
        onAuthStateChanged: () => undefined,
        signInWithPopup: () => {
            if (signInFail) {
                throw new Error("Failed to sign in.");
            }
        },
        signOut: () => undefined,
    };
}

(auth as any).GithubAuthProvider = class { };

export function storage() {
    return {
        ref: (path: string) => ({
            getDownloadURL: () => "testUrl",
            put: () => undefined,
        }),
    };
}
