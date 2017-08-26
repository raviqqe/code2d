import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { INewTask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const addTask = actionCreatorFactory().async<INewTask, null, Error>("ADD_TASK");

export const actionCreators = { addTask: addTask.started };

export const initialState: { error: Error | null, halfway: boolean } = {
    error: null,
    halfway: false,
};

export const reducer = reducerWithInitialState(initialState)
    .case(addTask.started, () => ({ error: null, halfway: true }))
    .case(addTask.done, () => ({ error: null, halfway: false }))
    .case(addTask.failed, (_, { error }) => ({ error, halfway: false }));

const tasks = new Tasks();

export const sagas = [
    takeEvery(
        addTask.started,
        function* _(task: INewTask): SagaIterator {
            try {
                yield call(tasks.create, task);
                yield put(addTask.done({ params: null, result: null }));
            } catch (error) {
                yield put(addTask.failed({ params: null, error }));
            }
        }),
];
