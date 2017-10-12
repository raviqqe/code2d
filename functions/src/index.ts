import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import * as analytics from "./analytics";

admin.initializeApp(functions.config().firebase);
analytics.initialize();

export { article, trendingArticles } from "./article";
export { default as addItem } from "./add-item";
export { book, trendingBooks } from "./book";
export { default as topSalesBooks } from "./top-sales-books";
export { trendingVideos, video } from "./video";
