import axios from "axios";
import * as firebase from "firebase";
import * as React from "react";
import * as ReactDOM from "react-dom";
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

const root = document.createElement("div");
root.style.display = "none";
root.style.position = "fixed";
root.style.top = "1em";
root.style.right = "1em";

document.body.appendChild(root);
console.log("Hello, world!");

chrome.runtime.onMessage.addListener(() => {
    console.log("Message is received!");
    root.style.display = "block";
    ReactDOM.render(<div>Hello, world!</div>, root);
});
