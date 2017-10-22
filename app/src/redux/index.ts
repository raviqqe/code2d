import localForage = require("localforage");
import * as _ from "lodash";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { autoRehydrate, createTransform, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";

import * as articles from "./articles";
import * as authentication from "./authentication";
import * as books from "./books";
import * as environment from "./environment";
import * as message from "./message";
import * as pages from "./pages";
import * as settings from "./settings";
import * as tasks from "./tasks";
import * as timer from "./timer";
import * as videos from "./videos";

const ducks = {
    articles,
    authentication,
    books,
    environment,
    message,
    pages,
    settings,
    tasks,
    timer,
    videos,
};

export function convertImmutableToMutable<A>(immutable: ImmutableObject<A>): A {
    return immutable.asMutable();
}

export function convertMutableToImmutable<A>(mutable: A): ImmutableObject<A> {
    return Immutable(mutable);
}

export default function() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers(_.mapValues(ducks, ({ reducer }) => reducer)),
        compose(applyMiddleware(sagaMiddleware), autoRehydrate()));

    sagaMiddleware.run(function* _() {
        yield all([].concat(
            ...Object.values(ducks).map(({ sagas }: any) => sagas).filter((sagas) => !!sagas)));
    });

    persistStore(store, {
        storage: localForage,
        transforms: [createTransform(convertImmutableToMutable, convertMutableToImmutable)],
        whitelist: Object.keys(ducks).filter((name: string) => ducks[name].persistent),
    });

    for (const duck of Object.values(ducks)) {
        const { storeInitializer }: any = duck;

        if (storeInitializer) {
            storeInitializer(store);
        }
    }

    return store;
}
