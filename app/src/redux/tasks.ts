import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { INewTask, ITask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const createTask = factory<INewTask>("CREATE_TASK");
const editTask = factory<{ newTask: ITask, oldTask: ITask }>("EDIT_TASK");
const markDoneTask = factory<ITask>("MARK_DONE_TASK");
const setUndoneTasks = factory<ITask[]>("SET_UNDONE_TASKS");
const updateUndoneTasks = factory<ITask[]>("UPDATE_UNDONE_TASKS");
const updateDoneTasks = factory<ITask[]>("UPDATE_DONE_TASKS");

export const actionCreators = {
    createTask,
    editTask: (oldTask: ITask, newTask: ITask) => editTask({ newTask, oldTask }),
    markDoneTask,
    setUndoneTasks,
    updateDoneTasks,
    updateUndoneTasks,
};

export const initialState: { doneTasks: ITask[], undoneTasks: ITask[] } = {
    doneTasks: [],
    undoneTasks: [],
};

export const reducer = reducerWithInitialState(initialState)
    .case(updateDoneTasks, ({ undoneTasks }, tasks) => ({ doneTasks: tasks, undoneTasks }))
    .case(updateUndoneTasks, ({ doneTasks }, tasks) => ({ doneTasks, undoneTasks: tasks }));

export const sagas = [
    takeEvery(
        createTask,
        function* _(task: INewTask): SagaIterator {
            yield call((new Tasks()).create, task);
        }),
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
