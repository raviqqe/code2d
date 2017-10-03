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

chrome.runtime.onMessage.addListener(async ({ url }, _, sendResponse) => {
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
                params: { url },
            });

        sendResponse(true);
    } catch (error) {
        console.error(error);
        sendResponse(false);
    }
});

firebase.auth().onAuthStateChanged(async (user) => signedIn = user !== null);
