import axios from "axios";
import * as firebase from "firebase";
import * as url from "url";

import config from "../config";

export async function call<R = any>(pathname: string, params: { [key: string]: string } = {}): Promise<R> {
    return (await axios.get(
        url.format({
            hostname: config.domain,
            pathname: "/functions/" + pathname,
            protocol: "https",
        }),
        {
            headers: {
                Authorization: `Bearer ${await firebase.auth().currentUser.getIdToken()}`,
            },
            params,
        })).data;
}
