import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { sleep } from "../lib/utils";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory("MESSAGE");

const sendMessage = factory<{ error: boolean, message: string }>("SET_MESSAGE");

export const actionCreators = {
    sendMessage: (message: string, error: boolean = false) => sendMessage({ error, message }),
};

export const initialState = Immutable({ error: false, message: "" });

export const reducer = reducerWithInitialState(initialState)
    .case(sendMessage, (state, newState) => state.merge(newState));

export const sagas = [
    takeEvery(
        sendMessage,
        function* _(): SagaIterator {
            yield call(sleep, 3000);
            yield put(sendMessage({ error: false, message: "" }));
        }),
];
