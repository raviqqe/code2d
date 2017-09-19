import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

export { default as article } from "./article";
export { default as books } from "./books";
export { default as video } from "./video";
