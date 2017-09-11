import axios from "axios";
import * as firebase from "firebase";
import { URL } from "url";

const endpoint = (
    `https://${process.env.REACT_APP_FIREBASE_REGION}-` +
    `${process.env.REACT_APP_FIREBASE_PROJECT_ID}` +
    ".cloudfunctions.net");

export async function call<R = any>(path: string): Promise<R> {
    return (await axios.get(
        (new URL(path, endpoint)).toString(),
        { params: { token: await firebase.auth().currentUser.getIdToken() } })).data;
}
