import { articlesRepository, IArticle, uriToArticle } from "../lib/articles";
import createItemsDuck, { IState as IItemsState, Reducer } from "./items";
import { takeEvery } from "./utils";

const duck = createItemsDuck("articles", articlesRepository, uriToArticle);

export const actionCreators = duck.actionCreators;

export const initialState = duck.initialState;

export const reducer = duck.reducer;

export const sagas = duck.sagas;
