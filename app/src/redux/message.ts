import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { sleep } from "../lib/utils";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory("MESSAGE");

const clearMessage = factory("CLEAR_MESSAGE");
const sendMessage = factory<{ error: boolean, message: string, temporary: boolean }>("SEND_MESSAGE");

export const actionCreators = {
    clearMessage,
    sendMessage: (message: string, options: { error?: boolean, temporary?: boolean } = {}) =>
        sendMessage({ message, error: false, temporary: true, ...options }),
};

export const initialState = Immutable({ error: false, message: "" });

export const reducer = reducerWithInitialState(initialState)
    .case(clearMessage, (state) => state.merge({ error: false, message: "" }))
    .case(sendMessage, (state, newState) => state.merge(newState));

export const sagas = [
    takeEvery(
        sendMessage,
        function* _({ temporary }): SagaIterator {
            if (temporary) {
                yield call(sleep, 5000);
                yield put(clearMessage());
            }
        }),
];
