import { include } from "common/domain/item";
import { createTask, extractTagsFromTasks, INewTask, ITask } from "common/domain/task";
import { findIndex } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";

import { tasksRepository } from "../infra/tasks";
import createItemsDuck, { IState as IItemsState, Reducer } from "./items";
import { takeEvery } from "./utils";

export interface IState extends IItemsState<ITask> {
    // Empty string "" means selecting tasks with no tag.
    // But, null means selecting all tasks.
    currentTag: string | null;
    tags: string[];
}

const duck = createItemsDuck(
    "tasks",
    tasksRepository,
    createTask,
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
const updateCurrentItem = factory<ITask>("UPDATE_CURRENT_ITEM");

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
        duck.getItemsActionCreators.done,
        function* _(): SagaIterator {
            yield put(actionCreators.getTags());
        }),
    takeEvery(
        getTags.started,
        function* _(): SagaIterator {
            const { doneItems, todoItems }: IState = yield duck.selectState();

            yield put(getTags.done({
                params: null,
                result: extractTagsFromTasks([...doneItems, ...todoItems]),
            }));
        }),
    takeEvery(duck.actionCreators.removeItem,
        function* _(): SagaIterator {
            yield put(actionCreators.getTags());
        }),
    takeEvery(
        updateCurrentItem,
        function* _(item: ITask): SagaIterator {
            item = { ...item, updatedAt: Date.now() };

            const { currentItem, doneItems, todoItems } = yield duck.selectState();
            const done = include(doneItems, item);
            const items = [...(done ? doneItems : todoItems)];

            items[findIndex(items, { id: currentItem.id })] = item;

            yield put(actionCreators.setItems(items, done));
            yield put(actionCreators.setCurrentItem(item));
            yield put(actionCreators.getTags());
        }),
];

export const persistent = true;

export const storeInitializer = duck.storeInitializer;
