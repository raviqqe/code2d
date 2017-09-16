import { articlesRepository, uriToArticle } from "../lib/articles";
import createItemsDuck from "./items";

const duck = createItemsDuck("articles", articlesRepository, uriToArticle);

export const actionCreators = duck.actionCreators;

export const initialState = duck.initialState;

export const reducer = duck.reducer;

export const sagas = duck.sagas;
