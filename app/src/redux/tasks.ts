import { SagaIterator } from "redux-saga";
import { call } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { INewTask, ITask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const createTask = factory<INewTask>("CREATE_TASK");
const editTask = factory<{ newTask: ITask, oldTask: ITask }>("EDIT_TASK");
const markTaskDone = factory<ITask>("MARK_TASK_DONE");
const markTaskTodo = factory<ITask>("MARK_TASK_TODO");
const removeTask = factory<ITask>("REMOVE_TASK");
const setTodoTasks = factory<ITask[]>("SET_TODO_TASKS");
const updateTodoTasks = factory<ITask[]>("UPDATE_TODO_TASKS");
const updateDoneTasks = factory<ITask[]>("UPDATE_DONE_TASKS");

export const actionCreators = {
    createTask,
    editTask: (oldTask: ITask, newTask: ITask) => editTask({ newTask, oldTask }),
    markTaskDone,
    markTaskTodo,
    removeTask,
    setTodoTasks,
    updateDoneTasks,
    updateTodoTasks,
};

export const initialState: { doneTasks: ITask[], undoneTasks: ITask[] } = {
    doneTasks: [],
    undoneTasks: [],
};

export const reducer = reducerWithInitialState(initialState)
    .case(updateDoneTasks, ({ undoneTasks }, tasks) => ({ doneTasks: tasks, undoneTasks }))
    .case(updateTodoTasks, ({ doneTasks }, tasks) => ({ doneTasks, undoneTasks: tasks }));

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
        markTaskDone,
        function* _(task: ITask): SagaIterator {
            yield call((new Tasks()).markDone, task);
        }),
    takeEvery(
        markTaskTodo,
        function* _(task: ITask): SagaIterator {
            yield call((new Tasks()).markTodo, task);
        }),
    takeEvery(
        removeTask,
        function* _(task: ITask): SagaIterator {
            yield call((new Tasks()).remove, task);
        }),
    takeEvery(
        setTodoTasks,
        function* _(tasks: ITask[]): SagaIterator {
            yield call((new Tasks()).setTodoTasks, tasks);
        }),
];
