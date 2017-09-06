import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as firebase from "../lib/firebase";
import { takeEvery } from "./utils";

const signIn = actionCreatorFactory().async<null, null>("SIGN_IN");

export const actionCreators = { signIn: () => signIn.started(null) };

export const initialState = Immutable({ halfway: false });

export const reducer = reducerWithInitialState(initialState)
    .case(signIn.started, (state) => state.merge({ halfway: true }))
    .case(signIn.done, (state) => state.merge({ halfway: false }))
    .case(signIn.failed, (state) => state.merge({ halfway: false }));

export const sagas = [
    takeEvery(
        signIn.started,
        function* _(): SagaIterator {
            try {
                yield call(firebase.signIn);
                yield put(signIn.done({ params: null, result: null }));
            } catch (error) {
                yield put(signIn.failed({ params: null, error }));
            }
        }),
];
