import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { ITask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const removeTask = factory<string>("REMOVE_TASK");
const setTaskList = factory<string[]>("SET_TASK_LIST");
const updateTasks = factory<ITask[]>("UPDATE_TASKS");

export const actionCreators = { removeTask, setTaskList, updateTasks };

export const initialState: { tasks: ITask[] } = { tasks: [] };

export const reducer = reducerWithInitialState(initialState)
    .case(updateTasks, (_, tasks) => ({ tasks }));

export const sagas = [
    takeEvery(
        removeTask,
        function* _(taskId: string): SagaIterator {
            yield call((new Tasks()).removeTask, taskId);
        }),
    takeEvery(
        setTaskList,
        function* _(taskIds: string[]): SagaIterator {
            yield call((new Tasks()).setTaskList, taskIds);
        }),
];
