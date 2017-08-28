import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { ITask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const editTask = factory<{ newTask: ITask, oldTask: ITask }>("EDIT_TASK");
const markDoneTask = factory<ITask>("MARK_DONE_TASK");
const setUndoneTasks = factory<ITask[]>("SET_TASK_LIST");
const updateUndoneTasks = factory<ITask[]>("UPDATE_TASKS");

export const actionCreators = {
    editTask: (oldTask: ITask, newTask: ITask) => editTask({ newTask, oldTask }),
    markDoneTask,
    setUndoneTasks,
    updateUndoneTasks,
};

export const initialState: { tasks: ITask[] } = { tasks: [] };

export const reducer = reducerWithInitialState(initialState)
    .case(updateUndoneTasks, (_, tasks) => ({ tasks }));

export const sagas = [
    takeEvery(
        editTask,
        function* _({ newTask, oldTask }): SagaIterator {
            yield call((new Tasks()).edit, oldTask, newTask);
        }),
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
