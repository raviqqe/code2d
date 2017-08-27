import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { ITask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const markDoneTask = factory<ITask>("MARK_DONE_TASK");
const setUndoneTasks = factory<ITask[]>("SET_TASK_LIST");
const updateUndoneTasks = factory<ITask[]>("UPDATE_TASKS");

export const actionCreators = { markDoneTask, setUndoneTasks, updateUndoneTasks };

export const initialState: { tasks: ITask[] } = { tasks: [] };

export const reducer = reducerWithInitialState(initialState)
    .case(updateUndoneTasks, (_, tasks) => ({ tasks }));

export const sagas = [
    takeEvery(
        markDoneTask,
        function* _(task: ITask): SagaIterator {
            yield call((new Tasks()).markDone, task);
        }),
    takeEvery(
        setUndoneTasks,
        function* _(tasks: ITask[]): SagaIterator {
            yield call((new Tasks()).setUndoneTasks, tasks);
        }),
];
