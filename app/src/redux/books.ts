import { booksRepository, getTrendingBooks, urlToBook } from "../lib/books";
import createItemsDuck from "./items";

const duck = createItemsDuck(
    "books",
    booksRepository,
    urlToBook,
    { getTrendingItems: getTrendingBooks });

export const actionCreators = duck.actionCreators;

export const initialState = duck.initialState;

export const reducer = duck.reducer;

export const sagas = duck.sagas;

export const persistent = true;
