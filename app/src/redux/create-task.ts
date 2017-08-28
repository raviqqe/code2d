import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { INewTask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const createTask = actionCreatorFactory().async<INewTask, null, Error>("CREATE_TASK");

export const actionCreators = { createTask: createTask.started };

export const initialState: { error: Error | null, halfway: boolean } = {
    error: null,
    halfway: false,
};

export const reducer = reducerWithInitialState(initialState)
    .case(createTask.started, () => ({ error: null, halfway: true }))
    .case(createTask.done, () => ({ error: null, halfway: false }))
    .case(createTask.failed, (_, { error }) => ({ error, halfway: false }));

const tasks = new Tasks();

export const sagas = [
    takeEvery(
        createTask.started,
        function* _(task: INewTask): SagaIterator {
            try {
                yield call(tasks.create, task);
                yield put(createTask.done({ params: null, result: null }));
            } catch (error) {
                yield put(createTask.failed({ params: null, error }));
            }
        }),
];
