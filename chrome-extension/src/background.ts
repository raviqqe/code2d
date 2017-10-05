import axios from "axios";
import * as firebase from "firebase";
import { format } from "url";

const config = require("../config.json");

firebase.initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: `${config.firebase.projectId}.firebaseapp.com`,
});

function sendNotification(message: string, contextMessage?: string) {
    chrome.notifications.create(null, {
        contextMessage,
        iconUrl: "images/icon_128.png",
        message,
        title: "code2d",
        type: "basic",
    });
}

async function addItem(url: string) {
    if (!firebase.auth().currentUser) {
        try {
            await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
        } catch (error) {
            console.error(error);
            return;
        }
    }

    try {
        const { name } = (await axios.get(
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
            })).data;

        sendNotification("An item is added.", name);
    } catch (error) {
        console.error(error);
        sendNotification("Could not add an item.");
    }
}

chrome.browserAction.onClicked.addListener(({ url }) => addItem(url));

chrome.contextMenus.create({
    contexts: ["link", "page"],
    onclick: ({ linkUrl, pageUrl }) => addItem(linkUrl || pageUrl),
    title: "Add an item",
});
