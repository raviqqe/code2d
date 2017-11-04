import axios from "axios";
import * as firebase from "firebase";
import * as url from "url";

import config from "../config";

const { firebase: { projectId } } = config;

export async function call<R = any>(
    name: string,
    { cache, params }: {
        cache?: boolean,
        params?: { [key: string]: string },
    } = { cache: true },
): Promise<R> {
    return (await axios.get(
        cache ?
            url.format({
                hostname: config.domain,
                pathname: "/functions/" + name,
                protocol: "https",
            }) :
            url.format({
                hostname: `us-central1-${projectId}.cloudfunctions.net`,
                pathname: "/" + name,
                protocol: "https",
            }),
        {
            headers: {
                Authorization: `Bearer ${await firebase.auth().currentUser.getIdToken()}`,
            },
            params,
        })).data;
}
