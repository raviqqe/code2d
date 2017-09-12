import { remove } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { articlesRepository, IArticle, uriToArticle } from "../lib/articles";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const addArticle = factory<string>("ADD_ARTICLE");
const getArticles = factory.async<void, IArticle[]>("GET_ARTICLES");
const removeArticle = factory<IArticle>("REMOVE_ARTICLE");
const setArticles = factory<IArticle[]>("SET_ARTICLES");
const toggleArticleState = factory<IArticle>("TOGGLE_ARTICLE_STATE");
const toggleArticlesState = factory("TOGGLE_ARTICLES_STATE");

export const actionCreators = {
    addArticle,
    getArticles: () => getArticles.started(null),
    removeArticle,
    setArticles,
    toggleArticleState,
    toggleArticlesState,
};

export interface IState {
    done: boolean;
    articles: IArticle[];
}

export const initialState: ImmutableObject<IState> = Immutable({
    articles: [],
    done: false,
    newArticle: { title: "", uri: "" },
});

export const reducer = reducerWithInitialState(initialState)
    .case(getArticles.done, (state, { result }) => state.merge({ articles: result }))
    .case(setArticles, (state, articles) => state.merge({ articles }))
    .case(toggleArticlesState, (state) => state.merge({ done: !state.done }));

export const sagas = [
    takeEvery(
        addArticle,
        function* _(uri: string): SagaIterator {
            yield put(setArticles([
                yield call(uriToArticle, uri),
                ...(yield selectState()).articles,
            ]));
        }),
    takeEvery(getArticles.started, getArticlesSaga),
    takeEvery(toggleArticlesState, getArticlesSaga),
    takeEvery(
        toggleArticleState,
        function* _(article: IArticle): SagaIterator {
            yield put(removeArticle(article));
            yield call(articlesRepository(!(yield selectState()).done).create, article);
        }),
    takeEvery(
        removeArticle,
        function* _(article: IArticle): SagaIterator {
            const articles = [...(yield selectState()).articles];

            remove(articles, article);

            yield put(setArticles(articles));
        }),
    takeEvery(
        setArticles,
        function* _(articles): SagaIterator {
            yield call(articlesRepository((yield selectState()).done).set, articles);
        }),
];

function selectState() {
    return select(({ articles }) => articles);
}

function* getArticlesSaga(): SagaIterator {
    yield put(getArticles.done({
        params: null,
        result: yield call(articlesRepository((yield selectState()).done).get),
    }));
}
