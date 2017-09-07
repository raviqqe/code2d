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
const getTasks = factory.async<boolean, ITask[]>("GET_TASKS");
const removeTask = factory<ITask>("REMOVE_TASK");
const resetNewTask = factory("RESET_NEW_TASK");
const setCurrentTask = factory<ITask | null>("SET_CURRENT_TASK");
const setNewTask = factory<INewTask>("SET_NEW_TASK");
const setTasks = factory<{ done: boolean, tasks: ITask[] }>("SET_TASKS");
const startCreatingTask = factory("START_CREATING_TASK");
const stopCreatingTask = factory("STOP_CREATING_TASK");
const toggleTaskState = factory<ITask>("SWITCH_TASK_STATE");
const updateCurrentTask = factory<ITask>("UPDATE_CURRENT_TASK");

export const actionCreators = {
    createTask,
    getTasks: getTasks.started,
    removeTask,
    setCurrentTask,
    setNewTask,
    setTasks: (done: boolean, tasks: ITask[]) => setTasks({ done, tasks }),
    startCreatingTask,
    stopCreatingTask,
    toggleTaskState,
    updateCurrentTask,
};

export interface IState {
    creatingTask: boolean;
    currentTask: ITask | null;
    doneTasks: ITask[];
    newTask: INewTask;
    todoTasks: ITask[];
}

export const initialState: ImmutableObject<IState> = Immutable({
    creatingTask: false,
    currentTask: null,
    doneTasks: [],
    newTask: { name: "", description: "" },
    todoTasks: [],
});

export const reducer = reducerWithInitialState(initialState)
    .case(createTask, (state) => state.merge({ creatingTask: false }))
    .case(resetNewTask, (state) => state.merge({ newTask: { name: "", description: "" } }))
    .case(getTasks.done, (state, { params, result }) =>
        state.merge(params ? { doneTasks: result } : { todoTasks: result }))
    .case(setCurrentTask, (state, currentTask) => state.merge({ currentTask }))
    .case(setNewTask, (state, newTask) => state.merge({ newTask }))
    .case(setTasks, (state, { done, tasks }) =>
        state.merge(done ? { doneTasks: tasks } : { todoTasks: tasks }))
    .case(startCreatingTask, (state) => state.merge({ creatingTask: true }))
    .case(stopCreatingTask, (state) => state.merge({ creatingTask: false }));

export const sagas = [
    takeEvery(
        createTask,
        function* _(): SagaIterator {
            const { newTask, todoTasks }: IState = yield select(({ tasks }) => tasks);
            const task: ITask = {
                ...newTask,
                createdAt: Date.now(),
                spentSeconds: 0,
                updatedAt: Date.now(),
            };

            yield put(setTasks({ done: false, tasks: [task, ...todoTasks] }));
            yield put(setCurrentTask(task));
            yield put(resetNewTask());
        }),
    takeEvery(
        getTasks.started,
        function* _(done: boolean): SagaIterator {
            yield put(getTasks.done({
                params: done,
                result: yield call(lib.tasks(done).get),
            }));
        }),
    takeEvery(
        toggleTaskState,
        function* _(task: ITask): SagaIterator {
            const { doneTasks, todoTasks }: IState = yield select(({ tasks }) => tasks);
            const done = findIndex(doneTasks, task) >= 0;

            yield put(removeTask(task));
            yield put(setTasks({ done: !done, tasks: [task, ...(done ? todoTasks : doneTasks)] }));
        }),
    takeEvery(
        removeTask,
        function* _(task: ITask): SagaIterator {
            const { doneTasks, todoTasks }: IState = yield select(({ tasks }) => tasks);
            const done = findIndex(doneTasks, task) >= 0;
            const tasks = [...(done ? doneTasks : todoTasks)];

            remove(tasks, task);

            yield put(setTasks({ done, tasks }));
        }),
    takeEvery(
        setTasks,
        function* _({ done, tasks }): SagaIterator {
            yield call(lib.tasks(done).set, tasks);
        }),
    takeEvery(
        updateCurrentTask,
        function* _(task: ITask): SagaIterator {
            const { currentTask, doneTasks, todoTasks }: IState = yield select(({ tasks }) => tasks);
            const done = findIndex(doneTasks, task) >= 0;
            const tasks = [...(done ? doneTasks : todoTasks)];

            tasks[findIndex(tasks, currentTask)] = task;

            yield put(setTasks({ done, tasks }));
            yield put(setCurrentTask(task));
        }),
];
