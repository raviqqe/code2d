import { SagaIterator } from "redux-saga";
import { call, select } from "redux-saga/effects";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as audio from "../lib/audio";
import { takeEvery } from "./utils";

const actionCreator = actionCreatorFactory();

const playAlarm = actionCreator("PLAY_ALARM");
const toggleTimer = actionCreator("TOGGLE_TIMER");

export const actionCreators = { playAlarm, toggleTimer };

export const initialState = Immutable({ on: false });

export const reducer = reducerWithInitialState(initialState)
    .case(toggleTimer, (state) => state.merge({ on: !state.on }));

export const sagas = [
    takeEvery(
        playAlarm,
        function* _(): SagaIterator {
            const { alarmVolume } = yield select(({ settings }) => settings);
            yield call(audio.playAlarm, alarmVolume);
        }),
];
