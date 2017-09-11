import axios from "axios";
import * as firebase from "firebase";
import * as url from "url";

const hostname = (
    `${process.env.REACT_APP_FIREBASE_REGION}-` +
    `${process.env.REACT_APP_FIREBASE_PROJECT_ID}` +
    ".cloudfunctions.net");

export async function call<R = any>(pathname: string): Promise<R> {
    return (await axios.get(
        url.format({ hostname, pathname: "/" + pathname, protocol: "https" }),
        { params: { token: await firebase.auth().currentUser.getIdToken() } })).data;
}
