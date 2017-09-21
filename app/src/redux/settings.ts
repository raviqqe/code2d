import { SagaIterator } from "redux-saga";
import { all, call, put, select } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import { ImmutableObject } from "seamless-immutable";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as notification from "../lib/notification";
import { takeEvery } from "./utils";

const actionCreator = actionCreatorFactory("SETTINGS");

const checkNotificationPermission = actionCreator("CHECK_NOTIFICATION_PERMISSION");
const requestNotificationPermission = actionCreator("REQUEST_NOTIFICATION_PERMISSION");
const setNotificationState = actionCreator<boolean | null>("SET_NOTIFICATION_STATE");

export const actionCreators = {
    checkNotificationPermission,
    requestNotificationPermission,
    setNotificationState,
};

export interface IState {
    notificationOn: boolean | null;
}

export const initialState: ImmutableObject<IState>
    = Immutable({ notificationOn: null });

export const reducer = reducerWithInitialState(initialState)
    .case(setNotificationState, (state, notificationOn) => state.merge({ notificationOn }));

export const sagas = [
    takeEvery(
        checkNotificationPermission,
        function* _() {
            yield put(setNotificationState(notification.permission()));
        }),
    takeEvery(
        requestNotificationPermission,
        function* _() {
            yield put(setNotificationState(yield call(notification.requestPermission)));
        }),
];
