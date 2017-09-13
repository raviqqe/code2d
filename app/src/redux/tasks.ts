import { findIndex, remove } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { INewTask, ITask, tasksRepository } from "../lib/tasks";
import { takeEvery } from "./utils";

const factory = actionCreatorFactory();

const createItem = factory("CREATE_TASK");
const getItems = factory.async<void, ITask[]>("GET_TASKS");
const removeItem = factory<ITask>("REMOVE_TASK");
const setCurrentTag = factory<string | null>("SET_CURRENT_TAG");
const setCurrentItem = factory<ITask | null>("SET_CURRENT_TASK");
const setNewItem = factory<INewTask>("SET_NEW_TASK");
const setItems = factory<ITask[]>("SET_TASKS");
const startCreatingItem = factory("START_CREATING_TASK");
const stopCreatingItem = factory("STOP_CREATING_TASK");
const toggleItemState = factory<ITask>("TOGGLE_TASK_STATE");
const toggleItemsState = factory("TOGGLE_TASKS_STATE");
const updateCurrentItem = factory<ITask>("UPDATE_CURRENT_TASK");

export const actionCreators = {
    createItem,
    getItems: () => getItems.started(null),
    removeItem,
    setCurrentItem,
    setCurrentTag,
    setItems,
    setNewItem,
    startCreatingItem,
    stopCreatingItem,
    toggleItemState,
    toggleItemsState,
    updateCurrentItem,
};

export interface IState {
    creatingItem: boolean;
    currentTag: string | null;
    currentItem: ITask | null;
    done: boolean;
    newItem: INewTask;
    items: ITask[];
}

export const initialState: ImmutableObject<IState> = Immutable({
    creatingItem: false,
    currentItem: null,
    currentTag: null,
    done: false,
    items: [],
    newItem: { description: "", name: "", tags: [] },
});

export const reducer = reducerWithInitialState(initialState)
    .case(createItem, (state) => state.merge({ creatingItem: false }))
    .case(getItems.done, (state, { result }) => state.merge({ items: result }))
    .case(setCurrentTag, (state, currentTag) => state.merge({ currentTag }))
    .case(setCurrentItem, (state, currentItem) => state.merge({ currentItem }))
    .case(setNewItem, (state, newItem) => state.merge({ newItem }))
    .case(setItems, (state, items) => state.merge({ items }))
    .case(startCreatingItem, (state) => state.merge({ creatingItem: true }))
    .case(stopCreatingItem, (state) => state.merge({ creatingItem: false }))
    .case(toggleItemsState, (state) => state.merge({ done: !state.done }));

export const sagas = [
    takeEvery(
        createItem,
        function* _(): SagaIterator {
            const { newItem, items }: IState = yield selectState();
            const task: ITask = {
                ...newItem,
                createdAt: Date.now(),
                spentSeconds: 0,
                updatedAt: Date.now(),
            };

            yield put(setItems([task, ...items]));
            yield put(setCurrentItem(task));
            yield put(setNewItem({ description: "", name: "", tags: [] }));
        }),
    takeEvery(getItems.started, getItemsSaga),
    takeEvery(toggleItemsState, getItemsSaga),
    takeEvery(
        toggleItemState,
        function* _(task: ITask): SagaIterator {
            yield put(removeItem(task));
            yield call(
                tasksRepository(!(yield selectState()).done).create,
                { ...task, updatedAt: Date.now() });
        }),
    takeEvery(
        removeItem,
        function* _(task: ITask): SagaIterator {
            const items = [...(yield selectState()).items];

            remove(items, task);

            yield put(setItems(items));
        }),
    takeEvery(
        setItems,
        function* _(items: ITask[]): SagaIterator {
            yield call(tasksRepository((yield selectState()).done).set, items);
        }),
    takeEvery(
        updateCurrentItem,
        function* _(task: ITask): SagaIterator {
            task = { ...task, updatedAt: Date.now() };

            const state: IState = yield selectState();
            const items = [...state.items];

            items[findIndex(items, state.currentItem)] = task;

            yield put(setItems(items));
            yield put(setCurrentItem(task));
        }),
];

function selectState() {
    return select(({ tasks }) => tasks);
}

function* getItemsSaga(): SagaIterator {
    const { done }: IState = yield selectState();

    try {
        yield put(getItems.done({ params: null, result: yield call(tasksRepository(done).get) }));
    } catch (error) {
        console.log(error);
    }
}
