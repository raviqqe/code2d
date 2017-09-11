import axios from "axios";
import * as firebase from "firebase";
import * as url from "url";

export async function call<R = any>(pathname: string): Promise<R> {
    return (await axios.get(
        url.format({
            hostname: process.env.REACT_APP_DOMAIN,
            pathname: "/functions/" + pathname,
            protocol: "https",
        }),
        { params: { token: await firebase.auth().currentUser.getIdToken() } })).data;
}
