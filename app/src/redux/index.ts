import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import * as signIn from "./sign-in";

export const reducer = combineReducers({ signIn: signIn.reducer });

export function* saga() {
    yield all([...signIn.sagas]);
}
