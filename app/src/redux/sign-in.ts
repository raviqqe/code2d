import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as aws from "../lib/aws";
import { unwrapAction } from "./utils";

const signIn = actionCreatorFactory().async<
    { token: string },
    undefined,
    { message: string }>("SIGN_IN");

export default { signIn: signIn.started };

export const initialState = {
    errorMessage: "",
    halfway: false,
};

export const reducer = reducerWithInitialState(initialState)
    .case(signIn.started, () => ({ errorMessage: "", halfway: true }))
    .case(signIn.done, () => ({ errorMessage: "", halfway: false }))
    .case(signIn.failed, (_, { error: { message } }) => ({
        errorMessage: message,
        halfway: false,
    }));

export const sagas = [
    takeEvery(signIn.started.type, unwrapAction(
        signIn.started,
        function* _({ token }): SagaIterator {
            yield call(aws.signIn, token);
        })),
];
