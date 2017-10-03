import axios from "axios";
import * as firebase from "firebase";
import { format } from "url";

const config = require("../config.json");

firebase.initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: `${config.firebase.projectId}.firebaseapp.com`,
});

function sendNotification(message: string) {
    chrome.notifications.create(null, {
        iconUrl: "images/icon_128.png",
        message,
        title: "code2d",
        type: "basic",
    });
}

let signedIn = false;

firebase.auth().onAuthStateChanged(async (user) => signedIn = user !== null);

chrome.browserAction.onClicked.addListener(async ({ url }) => {
    if (signedIn) {
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
                    // HACK: Invalidate caches by setting ineffective date parameters.
                    params: { url, date: Date.now() },
                });

            sendNotification("An item is added.");
        } catch (error) {
            console.error(error);
            sendNotification("Could not add an item.");
        }
    } else {
        await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
});
