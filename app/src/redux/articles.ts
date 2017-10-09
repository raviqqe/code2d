import * as analytics from "../lib/analytics";
import { articlesRepository, IArticle, urlToArticle } from "../lib/articles";
import createItemsDuck from "./items";

const duck = createItemsDuck(
    "articles",
    articlesRepository,
    async (url: string): Promise<IArticle> => {
        analytics.logUserEvent("AddArticle", url);
        return await urlToArticle(url);
    },
);

export const actionCreators = duck.actionCreators;

export const initialState = duck.initialState;

export const reducer = duck.reducer;

export const sagas = duck.sagas;
