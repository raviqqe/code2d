import * as firebase from "firebase";

const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;

export function initialize(): void {
    firebase.initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: `https://${projectId}.firebaseio.com`,
        storageBucket: `${projectId}.appspot.com`,
    });
}

export async function signIn(): Promise<void> {
    await firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider());
    await firebase.auth().getRedirectResult();
}

export function onAuthStateChanged(callback: (user: firebase.User) => void) {
    firebase.auth().onAuthStateChanged(callback);
}
