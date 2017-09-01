import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { INewTask, ITask, Tasks } from "../lib/task";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const createTask = factory<INewTask>("CREATE_TASK");
const editTask = factory<{ newTask: ITask, oldTask: ITask }>("EDIT_TASK");
const removeTask = factory<ITask>("REMOVE_TASK");
const setCurrentTask = factory<ITask | null>("SET_CURRENT_TASK");
const setNewTask = factory<INewTask>("SET_NEW_TASK");
const setTodoTasks = factory<ITask[]>("SET_TODO_TASKS");
const startCreatingTask = factory("START_CREATING_TASK");
const stopCreatingTask = factory("STOP_CREATING_TASK");
const switchTaskState = factory<ITask>("SWITCH_TASK_STATE");
const updateTodoTasks = factory<ITask[]>("UPDATE_TODO_TASKS");
const updateDoneTasks = factory<ITask[]>("UPDATE_DONE_TASKS");

export const actionCreators = {
    createTask,
    editTask: (oldTask: ITask, newTask: ITask) => editTask({ newTask, oldTask }),
    removeTask,
    setCurrentTask,
    setNewTask,
    setTodoTasks,
    startCreatingTask,
    stopCreatingTask,
    switchTaskState,
    updateDoneTasks,
    updateTodoTasks,
};

export interface IInitialState {
    creatingTask: boolean;
    currentTask: ITask | null;
    doneTasks: ITask[];
    newTask: INewTask;
    todoTasks: ITask[];
}

export const initialState: IInitialState = {
    creatingTask: false,
    currentTask: null,
    doneTasks: [],
    newTask: { name: "", description: "" },
    todoTasks: [],
};

export const reducer = reducerWithInitialState(initialState)
    .case(createTask, (state) =>
        ({ ...state, creatingTask: false, newTask: { name: "", description: "" } }))
    .case(setCurrentTask, (state, currentTask) => ({ ...state, currentTask }))
    .case(setNewTask, (state, newTask) => ({ ...state, newTask }))
    .case(startCreatingTask, (state) => ({ ...state, creatingTask: true }))
    .case(stopCreatingTask, (state) => ({ ...state, creatingTask: false }))
    .case(updateDoneTasks, (state, tasks) => ({ ...state, doneTasks: tasks }))
    .case(updateTodoTasks, (state, tasks) => ({ ...state, todoTasks: tasks }));

export const sagas = [
    takeEvery(
        createTask,
        function* _(newTask: INewTask): SagaIterator {
            const task = yield call((new Tasks()).create, newTask);
            yield put(setCurrentTask(task));
        }),
    takeEvery(
        editTask,
        function* _({ newTask, oldTask }): SagaIterator {
            yield call((new Tasks()).edit, oldTask, newTask);
            yield put(setCurrentTask(newTask));
        }),
    takeEvery(
        switchTaskState,
        function* _(task: ITask): SagaIterator {
            yield call((new Tasks()).switchState, task);
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
