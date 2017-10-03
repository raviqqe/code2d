import axios from "axios";
import * as firebase from "firebase";
import * as url from "url";

const config = require("../config.json");

firebase.initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: `${config.firebase.projectId}.firebaseapp.com`,
});

async function addItem(): Promise<void> {
    await axios.get(
        url.format({
            hostname: `us-central1-${config.firebase.projectId}.cloudfunctions.net`,
            pathname: "/addItem",
            protocol: "https",
        }),
        {
            headers: {
                Authorization: `Bearer ${await firebase.auth().currentUser.getIdToken()}`,
            },
            params: { url: window.location.href },
        });
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.onMessage.addListener(() => {
        // TODO: Render something..
    });
});
