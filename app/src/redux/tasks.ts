import { findIndex, remove } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as lib from "../lib/tasks";
import { INewTask, ITask } from "../lib/tasks";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const createTask = factory("CREATE_TASK");
const getTasks = factory.async<void, ITask[]>("GET_TASKS");
const removeTask = factory<ITask>("REMOVE_TASK");
const setCurrentTask = factory<ITask | null>("SET_CURRENT_TASK");
const setNewTask = factory<INewTask>("SET_NEW_TASK");
const setTasks = factory<ITask[]>("SET_TASKS");
const startCreatingTask = factory("START_CREATING_TASK");
const stopCreatingTask = factory("STOP_CREATING_TASK");
const toggleTaskState = factory<ITask>("TOGGLE_TASK_STATE");
const toggleTasksState = factory("TOGGLE_TASKS_STATE");
const updateCurrentTask = factory<ITask>("UPDATE_CURRENT_TASK");

export const actionCreators = {
    createTask,
    getTasks: () => getTasks.started(null),
    removeTask,
    setCurrentTask,
    setNewTask,
    setTasks,
    startCreatingTask,
    stopCreatingTask,
    toggleTaskState,
    toggleTasksState,
    updateCurrentTask,
};

export interface IState {
    creatingTask: boolean;
    currentTask: ITask | null;
    done: boolean;
    newTask: INewTask;
    tasks: ITask[];
}

export const initialState: ImmutableObject<IState> = Immutable({
    creatingTask: false,
    currentTask: null,
    done: false,
    newTask: { name: "", description: "" },
    tasks: [],
});

export const reducer = reducerWithInitialState(initialState)
    .case(createTask, (state) => state.merge({ creatingTask: false }))
    .case(getTasks.done, (state, { result }) =>
        state.merge({ tasks: result, currentTask: result[0] || null }))
    .case(setCurrentTask, (state, currentTask) => state.merge({ currentTask }))
    .case(setNewTask, (state, newTask) => state.merge({ newTask }))
    .case(setTasks, (state, tasks) => state.merge({ tasks }))
    .case(startCreatingTask, (state) => state.merge({ creatingTask: true }))
    .case(stopCreatingTask, (state) => state.merge({ creatingTask: false }))
    .case(toggleTasksState, (state) => state.merge({ done: !state.done }));

export const sagas = [
    takeEvery(
        createTask,
        function* _(): SagaIterator {
            const { newTask, tasks }: IState = yield selectState();
            const task: ITask = {
                ...newTask,
                createdAt: Date.now(),
                spentSeconds: 0,
                updatedAt: Date.now(),
            };

            yield put(setTasks([task, ...tasks]));
            yield put(setCurrentTask(task));
            yield put(setNewTask({ description: "", name: "" }));
        }),
    takeEvery(getTasks.started, getTasksSaga),
    takeEvery(toggleTasksState, getTasksSaga),
    takeEvery(
        toggleTaskState,
        function* _(task: ITask): SagaIterator {
            yield put(removeTask(task));
            yield call(lib.tasks(!(yield selectState()).done).create, task);
        }),
    takeEvery(
        removeTask,
        function* _(task: ITask): SagaIterator {
            const tasks = [...(yield selectState()).tasks];

            remove(tasks, task);

            yield put(setTasks(tasks));
        }),
    takeEvery(
        setTasks,
        function* _(tasks): SagaIterator {
            yield call(lib.tasks((yield selectState()).done).set, tasks);
        }),
    takeEvery(
        updateCurrentTask,
        function* _(task: ITask): SagaIterator {
            const state: IState = yield selectState();
            const tasks = [...state.tasks];

            tasks[findIndex(tasks, state.currentTask)] = task;

            yield put(setTasks(tasks));
            yield put(setCurrentTask(task));
        }),
];

function selectState() {
    return select(({ tasks }) => tasks);
}

function* getTasksSaga(): SagaIterator {
    const { done }: IState = yield selectState();
    yield put(getTasks.done({ params: null, result: yield call(lib.tasks(done).get) }));
}
