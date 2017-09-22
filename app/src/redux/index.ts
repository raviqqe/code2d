import localForage = require("localforage");
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { autoRehydrate, createTransform, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";

import * as firebase from "../lib/firebase";
import * as articles from "./articles";
import * as authentication from "./authentication";
import * as books from "./books";
import * as message from "./message";
import * as settings from "./settings";
import * as tasks from "./tasks";
import * as timer from "./timer";
import * as videos from "./videos";

export default function() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            articles: articles.reducer,
            authentication: authentication.reducer,
            books: books.reducer,
            message: message.reducer,
            settings: settings.reducer,
            tasks: tasks.reducer,
            timer: timer.reducer,
            videos: videos.reducer,
        }),
        compose(applyMiddleware(sagaMiddleware), autoRehydrate()));

    sagaMiddleware.run(function* _() {
        yield all([
            ...authentication.sagas,
            ...articles.sagas,
            ...books.sagas,
            ...message.sagas,
            ...settings.sagas,
            ...tasks.sagas,
            ...videos.sagas,
        ]);
    });

    persistStore(store, {
        storage: localForage,
        transforms: [createTransform(
            (immutable: ImmutableObject<any>) => immutable.asMutable(),
            (mutable) => Immutable(mutable),
        )],
        whitelist: ["articles", "books", "settings", "tasks"],
    });

    firebase.onAuthStateChanged(async (user) => {
        if (user === null) {
            store.dispatch(authentication.actionCreators.setSignInState(false));
        } else {
            store.dispatch(authentication.actionCreators.setSignInState(true));
        }
    });

    return store;
}
