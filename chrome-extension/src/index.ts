import axios from "axios";
import * as firebase from "firebase";
import { format } from "url";

const config = require("../config.json");

firebase.initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: `${config.firebase.projectId}.firebaseapp.com`,
});

async function getCurrentTabUrl(): Promise<string> {
    return await new Promise((resolve) =>
        chrome.tabs.query(
            { active: true, currentWindow: true },
            (tabs) => resolve(tabs[0].url))) as string;
}

async function addItem(): Promise<void> {
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
            params: { url: await getCurrentTabUrl() },
        });
}

document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("sign-in-button") as HTMLButtonElement;
    const message = document.getElementById("message");

    let signingIn = false;

    button.addEventListener("click", async () => {
        signingIn = true;
        await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
    });

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user === null) {
            button.style.display = "initial";
            message.style.display = "none";
        } else {
            button.style.display = "none";
            message.style.display = "initial";

            if (signingIn) {
                message.appendChild(document.createTextNode("Signed in"));
            } else {
                message.appendChild(document.createTextNode("Adding item..."));
                await addItem();
                message.appendChild(document.createTextNode("Item added"));
            }

            setTimeout(() => window.close(), 5000);
        }
    });
});
