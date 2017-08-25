import * as firebase from "firebase";

import ITask from "./task";

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

export class Tasks {
    public create(task: ITask): string {
        return this.ref.push(task).key;
    }

    public async findAll(): Promise<{ [key: string]: ITask }> {
        return (await this.ref.once("value")).val();
    }

    private get ref(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/tasks`);
    }
}
