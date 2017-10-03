import axios from "axios";
import * as firebase from "firebase";
import { format } from "url";

const config = require("../config.json");

firebase.initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: `${config.firebase.projectId}.firebaseapp.com`,
});

let signedIn = false;

chrome.browserAction.onClicked.addListener(async (tab) => {
    if (signedIn) {
        chrome.tabs.sendMessage(tab.id, {});
    } else {
        await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
});

chrome.runtime.onMessage.addListener(({ url }, _, sendResponse) => {
    (async () => {
        try {
            await axios.get(
                format({
                    hostname: `us-central1-${config.firebase.projectId}.cloudfunctions.net`,
                    pathname: "/addItem",
                    protocol: "https",
                }),
                {
                    headers: {
                        Authorization: `Bearer ${await firebase.auth().currentUser.getIdToken()}`,
                    },
                    // HACK: Invalidate caches by setting date parameters.
                    params: { url, date: Date.now() },
                });

            sendResponse(null);
        } catch (error) {
            console.error(error);
            sendResponse(error);
        }
    })();

    return true; // Keep connections.
});

firebase.auth().onAuthStateChanged(async (user) => signedIn = user !== null);
