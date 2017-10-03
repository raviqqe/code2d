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
root.style.visibility = "hidden";
root.style.transform = "translateY(-200%)";
root.style.transition = "visibility 0.1s, transform 0.1s";
root.style.background = "white";
root.style["border-radius"] = "0.5em";
root.style["box-shadow"] = "0.5em 0.5em 1em rgba(0, 0, 0, 0.5)";
root.style.position = "fixed";
root.style.top = "1em";
root.style.right = "1em";

document.body.appendChild(root);

chrome.runtime.onMessage.addListener(() => {
    root.style.visibility = "visible";
    root.style.transform = "translateY(0)";
    ReactDOM.render(<div>Hello, world!</div>, root);
});
