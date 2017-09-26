export let signInFail = false;

export function initializeApp() {
    return;
}

export function auth() {
    return {
        currentUser: { delete: () => undefined, uid: "testUid" },
        getRedirectResult: () => {
            if (signInFail) {
                throw new Error("Failed to sign in.");
            }
        },
        onAuthStateChanged: () => undefined,
        signInWithRedirect: () => undefined,
        signOut: () => undefined,
    };
}

(auth as any).GithubAuthProvider = class { };

export function storage() {
    return {
        ref: (path: string) => ({
            getDownloadURL: () => "testUrl",
            putString: (data: string) => undefined,
        }),
    };
}
