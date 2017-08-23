import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import * as signIn from "./sign-in";

export default function() {
    const sagaMiddleware = createSagaMiddleware();

    sagaMiddleware.run(function* _() {
        yield all([...signIn.sagas]);
    });

    return createStore(
        combineReducers({
            signIn: signIn.reducer,
        }),
        compose(applyMiddleware(sagaMiddleware)));
}
