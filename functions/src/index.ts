import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

export { article, trendingArticles } from "./article";
export { default as addItem } from "./add-item";
export { book, trendingBooks } from "./book";
export { default as country } from "./country";
export { trendingVideos, video } from "./video";
