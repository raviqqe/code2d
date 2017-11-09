import * as firebase from "firebase";

import config from "../config";
import storage from "./storage";

const { apiKey, projectId } = config.firebase;

export function initialize(): void {
    firebase.initializeApp({
        apiKey,
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: `https://${projectId}.firebaseio.com`,
        storageBucket: `${projectId}.appspot.com`,
    });

    storage.initialize();
}

export async function signIn(): Promise<void> {
    await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
}

export async function signOut(): Promise<void> {
    await firebase.auth().signOut();
}

export async function deleteAccount(): Promise<void> {
    await firebase.auth().currentUser.delete();
}

export function onAuthStateChanged(callback: (user: firebase.User) => void): void {
    firebase.auth().onAuthStateChanged(callback);
}
