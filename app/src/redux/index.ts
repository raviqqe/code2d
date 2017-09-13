import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { autoRehydrate, createTransform, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";

import * as firebase from "../lib/firebase";
import { tasksRepository } from "../lib/tasks";
import * as articles from "./articles";
import * as authState from "./auth-state";
import * as books from "./books";
import * as signIn from "./sign-in";
import * as tasks from "./tasks";
import * as timer from "./timer";

export default function() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            articles: articles.reducer,
            authState: authState.reducer,
            books: books.reducer,
            signIn: signIn.reducer,
            tasks: tasks.reducer,
            timer: timer.reducer,
        }),
        compose(applyMiddleware(sagaMiddleware), autoRehydrate()));

    sagaMiddleware.run(function* _() {
        yield all([
            ...articles.sagas,
            ...books.sagas,
            ...signIn.sagas,
            ...tasks.sagas,
        ]);
    });

    persistStore(store, {
        transforms: [createTransform(
            (immutable: ImmutableObject<any>) => immutable.asMutable(),
            (mutable) => Immutable(mutable),
        )],
        whitelist: ["articles", "books", "tasks"],
    });

    firebase.onAuthStateChanged(async (user) => {
        if (user === null) {
            store.dispatch(authState.actionCreators.signOut());
        } else {
            store.dispatch(authState.actionCreators.signIn());
            store.dispatch(tasks.actionCreators.getTasks());
            await tasksRepository(false).get();
            await tasksRepository(true).get();
            store.dispatch(articles.actionCreators.getArticles());
            store.dispatch(books.actionCreators.getBooks());
        }
    });

    return store;
}
