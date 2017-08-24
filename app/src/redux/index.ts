import * as firebase from "firebase";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import authStateActionCreators from "./auth-state";
import * as authState from "./auth-state";
import * as signIn from "./sign-in";

export default function() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            authState: authState.reducer,
            signIn: signIn.reducer,
        }),
        compose(applyMiddleware(sagaMiddleware)));

    sagaMiddleware.run(function* _() {
        yield all([...signIn.sagas]);
    });

    firebase.auth().onAuthStateChanged(
        (user) => store.dispatch(
            user === null ?
                authStateActionCreators.signOut() :
                authStateActionCreators.signIn()));

    return store;
}
