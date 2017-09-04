import { findIndex, remove } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as tasks from "../lib/tasks";
import { doneTasks, INewTask, ITask, todoTasks } from "../lib/tasks";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const createTask = factory("CREATE_TASK");
const getDoneTasks = factory.async<void, ITask[]>("GET_DONE_TASKS");
const getTodoTasks = factory.async<void, ITask[]>("GET_TODO_TASKS");
const removeDoneTask = factory<ITask>("REMOVE_DONE_TASK");
const removeTodoTask = factory<ITask>("REMOVE_TODO_TASK");
const resetNewTask = factory("RESET_NEW_TASK");
const setCurrentTask = factory<ITask | null>("SET_CURRENT_TASK");
const setNewTask = factory<INewTask>("SET_NEW_TASK");
const setDoneTask = factory<{ newTask: ITask, oldTask: ITask }>("SET_DONE_TASK");
const setDoneTasks = factory<ITask[]>("SET_DONE_TASKS");
const setTodoTask = factory<{ newTask: ITask, oldTask: ITask }>("SET_TODO_TASK");
const setTodoTasks = factory<ITask[]>("SET_TODO_TASKS");
const startCreatingTask = factory("START_CREATING_TASK");
const stopCreatingTask = factory("STOP_CREATING_TASK");
const switchTaskState = factory<ITask>("SWITCH_TASK_STATE");

export const actionCreators = {
    createTask,
    getDoneTasks: () => getDoneTasks.started(null),
    getTodoTasks: () => getTodoTasks.started(null),
    removeDoneTask,
    removeTodoTask,
    setCurrentTask,
    setDoneTask: (oldTask: ITask, newTask: ITask) => setDoneTask({ newTask, oldTask }),
    setDoneTasks,
    setNewTask,
    setTodoTask: (oldTask: ITask, newTask: ITask) => setTodoTask({ newTask, oldTask }),
    setTodoTasks,
    startCreatingTask,
    stopCreatingTask,
    switchTaskState,
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
    .case(getDoneTasks.done, (state, { result }) => state.merge({ doneTasks: result }))
    .case(getTodoTasks.done, (state, { result }) => state.merge({ todoTasks: result }))
    .case(setCurrentTask, (state, currentTask) => state.merge({ currentTask }))
    .case(setNewTask, (state, newTask) => state.merge({ newTask }))
    .case(setDoneTasks, (state, doneTasks) => state.merge({ doneTasks }))
    .case(setTodoTasks, (state, todoTasks) => state.merge({ todoTasks }))
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

            yield put(setTodoTasks([task, ...todoTasks]));
            yield put(setCurrentTask(task));
            yield put(resetNewTask());
        }),
    takeEvery(
        getDoneTasks.started,
        function* _(): SagaIterator {
            yield put(getDoneTasks.done({ params: null, result: yield call(doneTasks.get) }));
        }),
    takeEvery(
        getTodoTasks.started,
        function* _(): SagaIterator {
            yield put(getTodoTasks.done({ params: null, result: yield call(todoTasks.get) }));
        }),
    takeEvery(
        switchTaskState,
        function* _(task: ITask): SagaIterator {
            const { doneTasks, todoTasks }: IState = yield select(({ tasks }) => tasks);

            if (findIndex(todoTasks, task) >= 0) {
                yield put(removeTodoTask(task));
                yield put(setDoneTasks([task, ...doneTasks]));
            } else {
                yield put(removeDoneTask(task));
                yield put(setTodoTasks([task, ...todoTasks]));
            }
        }),
    takeEvery(
        removeDoneTask,
        function* _(task: ITask): SagaIterator {
            const tasks: ITask[] = [...(yield select(({ tasks: { doneTasks } }) => doneTasks))];

            remove(tasks, task);

            yield put(setDoneTasks(tasks));
        }),
    takeEvery(
        removeTodoTask,
        function* _(task: ITask): SagaIterator {
            const tasks: ITask[] = [...(yield select(({ tasks: { todoTasks } }) => todoTasks))];

            remove(tasks, task);

            yield put(setTodoTasks(tasks));
        }),
    takeEvery(
        setDoneTask,
        function* _({ newTask, oldTask }): SagaIterator {
            const tasks: ITask[] = [...(yield select(({ tasks: { doneTasks } }) => doneTasks))];
            tasks[findIndex(tasks, oldTask)] = newTask;
            yield put(setDoneTasks(tasks));
            yield put(setCurrentTask(newTask));
        }),
    takeEvery(
        setDoneTasks,
        function* _(tasks: ITask[]): SagaIterator {
            yield call(doneTasks.set, tasks);
        }),
    takeEvery(
        setTodoTask,
        function* _({ newTask, oldTask }): SagaIterator {
            const tasks: ITask[] = [...(yield select(({ tasks: { todoTasks } }) => todoTasks))];
            tasks[findIndex(tasks, oldTask)] = newTask;
            yield put(setTodoTasks(tasks));
            yield put(setCurrentTask(newTask));
        }),
    takeEvery(
        setTodoTasks,
        function* _(tasks: ITask[]): SagaIterator {
            yield call(todoTasks.set, tasks);
        }),
];
