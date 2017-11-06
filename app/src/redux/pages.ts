import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { logPageView } from "../infra/analytics";
import { takeEvery } from "./utils";

export type Page = "tasks" | "articles" | "videos" | "books";

export const pages: Page[] = ["tasks", "articles", "videos", "books"];

const actionCreator = actionCreatorFactory();

const setCurrentPage = actionCreator<Page>("SET_PAGE");

export const actionCreators = { setCurrentPage };

export const initialState = Immutable({ currentPage: "tasks" as Page });

export const reducer = reducerWithInitialState(initialState)
    .case(setCurrentPage, (state, currentPage) => state.merge({ currentPage }));

export const sagas = [
    takeEvery(
        setCurrentPage,
        function* _(page: Page): SagaIterator {
            yield call(logPageView, page);
        }),
];

export const persistent = true;
