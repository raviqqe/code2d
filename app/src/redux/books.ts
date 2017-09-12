import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { IBook } from "../lib/books";
import * as functions from "../lib/functions";
import { takeEvery } from "./utils";

const getBooks = actionCreatorFactory().async<void, IBook[]>("GET_BOOKS");

export const actionCreators = { getBooks: () => getBooks.started(null) };

export interface IState {
    books: IBook[] | null;
}

export const initialState: ImmutableObject<IState> = Immutable({ books: null });

export const reducer = reducerWithInitialState(initialState)
    .case(getBooks.done, (state, { result }) => state.merge({ books: result }));

export const sagas = [
    takeEvery(
        getBooks.started,
        function* getTasksSaga(): SagaIterator {
            try {
                yield put(getBooks.done({
                    params: null,
                    result: yield call(functions.call, "books"),
                }));
            } catch (error) {
                console.error(error);
            }
        }),
];
