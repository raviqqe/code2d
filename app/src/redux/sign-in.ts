import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as firebase from "../lib/firebase";
import { takeEvery } from "./utils";

const signIn = actionCreatorFactory().async<
    null,
    null,
    Error>("SIGN_IN");

export default { signIn: () => signIn.started(null) };

export const initialState: { error: Error | null, halfway: boolean } = {
    error: null,
    halfway: false,
};

export const reducer = reducerWithInitialState(initialState)
    .case(signIn.started, () => ({ error: null, halfway: true }))
    .case(signIn.done, () => ({ error: null, halfway: false }))
    .case(signIn.failed, (_, { error }) => ({ error, halfway: false }));

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
