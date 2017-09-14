import { findIndex } from "lodash";
import { SagaIterator } from "redux-saga";
import { put, select } from "redux-saga/effects";

import { INewTask, ITask, tasksRepository } from "../lib/tasks";
import createItemsDuck, { IState as IItemsState, Reducer } from "./items";
import { takeEvery } from "./utils";

export interface IState extends IItemsState<ITask> {
    creatingItem: boolean;
    currentTag: string | null;
    newItem: INewTask;
}

const duck = createItemsDuck(
    "tasks",
    tasksRepository,
    (task: INewTask) => ({
        ...task,
        createdAt: Date.now(),
        spentSeconds: 0,
        updatedAt: Date.now(),
    }),
    {
        creatingItem: false,
        currentTag: null as string | null,
        newItem: { description: "", name: "", tags: [] },
    },
);

const factory = duck.actionCreatorFactory;

const setCurrentTag = factory<string | null>("SET_CURRENT_TAG");
const startCreatingItem = factory("START_CREATING_TASK");
const stopCreatingItem = factory("STOP_CREATING_TASK");
const updateCurrentItem = factory<ITask>("UPDATE_CURRENT_TASK");

export const actionCreators = {
    ...duck.actionCreators,
    setCurrentTag,
    startCreatingItem,
    stopCreatingItem,
    updateCurrentItem,
};

export const initialState = duck.initialState;

export const reducer =
    (duck.reducer as Reducer<ITask, IState>)
        .case(duck.actionCreators.createItem, (state) => state.merge({ creatingItem: false }))
        .case(setCurrentTag, (state, currentTag) => state.merge({ currentTag }))
        .case(startCreatingItem, (state) => state.merge({ creatingItem: true }))
        .case(stopCreatingItem, (state) => state.merge({ creatingItem: false }));

export const sagas = [
    ...duck.sagas,
    takeEvery(
        updateCurrentItem,
        function* _(task: ITask): SagaIterator {
            task = { ...task, updatedAt: Date.now() };

            const state = yield duck.selectState();
            const items = [...state.items];

            items[findIndex(items, state.currentItem)] = task;

            yield put(actionCreators.setItems(items));
            yield put(actionCreators.setCurrentItem(task));
        }),
];
