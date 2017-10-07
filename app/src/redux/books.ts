import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";

import * as lib from "../lib/books";
import { booksRepository, IBook, urlToBook } from "../lib/books";
import createItemsDuck, { IState as IItemsState, Reducer } from "./items";
import { takeEvery } from "./utils";

interface IState extends IItemsState<IBook> {
    topSalesBooks: IBook[];
}

const duck = createItemsDuck(
    "books",
    booksRepository,
    urlToBook,
    { partialInitialState: { topSalesBooks: [] } });

const getTopSalesBooks = duck.actionCreatorFactory.async<void, IBook[]>("GET_TOP_SALES_BOOKS");

export const actionCreators = {
    ...duck.actionCreators,
    getTopSalesBooks: () => getTopSalesBooks.started(null),
};

export const initialState = duck.initialState;

export const reducer = (duck.reducer as Reducer<IBook, IState>)
    .case(getTopSalesBooks.done, (state, { result }) => state.merge({ topSalesBooks: result }));

export const sagas = [
    ...duck.sagas,
    takeEvery(
        getTopSalesBooks.started,
        function* _(): SagaIterator {
            yield put(getTopSalesBooks.done(yield call(lib.getTopSalesBooks)));
        }),
];
