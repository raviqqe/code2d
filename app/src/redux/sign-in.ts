import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as firebase from "../lib/firebase";
import { takeEvery } from "./utils";

const signIn = actionCreatorFactory().async<
    null,
    null,
    Error>("SIGN_IN");

export default { signIn: () => signIn.started(null) };

export interface IState {
    error: Error | null;
    halfway: boolean;
}

export const initialState: ImmutableObject<IState> = Immutable({
    error: null,
    halfway: false,
});

export const reducer = reducerWithInitialState(initialState)
    .case(signIn.started, (state) => state.merge({ error: null, halfway: true }))
    .case(signIn.done, (state) => state.merge({ error: null, halfway: false }))
    .case(signIn.failed, (state, { error }) => state.merge({ error, halfway: false }));

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
