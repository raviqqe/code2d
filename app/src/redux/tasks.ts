import { findIndex } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";

import { extractTagsFromTasks, INewTask, ITask, tasksRepository } from "../lib/tasks";
import createItemsDuck, { IState as IItemsState, Reducer } from "./items";
import { takeEvery } from "./utils";

export interface IState extends IItemsState<ITask> {
    currentTag: string | null;
    tags: string[];
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
        onToggleTaskState: (task: ITask): ITask => ({ ...task, updatedAt: Date.now() }),
        partialInitialState: {
            currentTag: null,
            tags: [],
        },
    },
);

const factory = duck.actionCreatorFactory;

const getTags = factory.async<void, string[]>("GET_TAGS");
const setCurrentTag = factory<string | null>("SET_CURRENT_TAG");
const updateCurrentItem = factory<ITask>("UPDATE_CURRENT_TASK");

export const actionCreators = {
    ...duck.actionCreators,
    getTags: () => getTags.started(null),
    setCurrentTag,
    updateCurrentItem,
};

export const initialState = duck.initialState;

export const reducer =
    (duck.reducer as Reducer<ITask, IState>)
        .case(duck.actionCreators.createItem, (state) => state.merge({ currentTag: null }))
        .case(getTags.done, (state, { result }) => state.merge({ tags: result }))
        .case(setCurrentTag, (state, currentTag) => state.merge({ currentTag }));

export const sagas = [
    ...duck.sagas,
    takeEvery(
        getTags.started,
        function* _(): SagaIterator {
            yield put(getTags.done({
                params: null,
                result: extractTagsFromTasks([
                    ...(yield call(tasksRepository(false).get)),
                    ...(yield call(tasksRepository(true).get)),
                ]),
            }));
        }),
    takeEvery(
        updateCurrentItem,
        function* _(task: ITask): SagaIterator {
            task = { ...task, updatedAt: Date.now() };

            const state = yield duck.selectState();
            const items = [...state.items];

            items[findIndex(items, state.currentItem)] = task;

            yield put(actionCreators.setItems(items));
            yield put(actionCreators.setCurrentItem(task));
            yield put(getTags.started(null));
        }),
];
