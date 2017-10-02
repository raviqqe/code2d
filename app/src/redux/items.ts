import { remove } from "lodash";
import { SagaIterator } from "redux-saga";
import { all, call, put, select } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { ReducerBuilder, reducerWithInitialState } from "typescript-fsa-reducers";

import { createId, IItem, include } from "../lib/items";
import ItemsRepository from "../lib/items-repository";
import * as message from "./message";
import { takeEvery } from "./utils";

export interface IState<A> {
    currentItem: A | null;
    doneItems: A[];
    todoItems: A[];
}

export type Reducer<A, S extends IState<A>>
    = ReducerBuilder<ImmutableObject<S>, ImmutableObject<S>>;

export default function createItemsDuck<A extends IItem, B>(
    reducerName: string,
    repository: (done: boolean) => ItemsRepository<A>,
    initialize: (itemSource: B) => A | Promise<A>,
    options: { partialInitialState?: {}, onToggleTaskState?: (item: A) => A } = {}) {
    options = Object.assign(
        { partialInitialState: {}, onToggleTaskState: (item: A): A => item },
        options);

    const factory = actionCreatorFactory(reducerName.toUpperCase());

    const createItem = factory<B>("CREATE_ITEM");
    const getItems = factory.async<void, { todoItems: A[], doneItems: A[] }>("GET_ITEMS");
    const removeItem = factory<A>("REMOVE_ITEM");
    const setCurrentItem = factory<A | null>("SET_CURRENT_ITEM");
    const setItems = factory<{ done: boolean, items: A[] }>("SET_ITEMS");
    const toggleItemState = factory<A>("TOGGLE_ITEM_STATE");

    const initialState: ImmutableObject<IState<A>> = Immutable({
        ...options.partialInitialState,
        currentItem: null,
        doneItems: [],
        todoItems: [],
    });

    function selectState() {
        return select((state) => state[reducerName]);
    }

    return {
        actionCreatorFactory: factory,
        actionCreators: {
            createItem,
            getItems: () => getItems.started(null),
            removeItem,
            setCurrentItem,
            setItems: (items: A[], done: boolean) => setItems({ done, items }),
            toggleItemState,
        },
        initialState,
        reducer: reducerWithInitialState(initialState)
            .case(getItems.done, (state, { result }) => state.merge(result))
            .case(setCurrentItem, (state, currentItem) => state.merge({ currentItem }))
            .case(setItems, (state, { done, items }) =>
                state.merge(done ? { doneItems: items } : { todoItems: items })),
        sagas: [
            takeEvery(
                createItem,
                function* _(itemSource: B): SagaIterator {
                    try {
                        yield put(message.actionCreators.sendMessage(
                            "Creating an item...",
                            { temporary: false }));

                        const item: A = createId(yield call(initialize, itemSource));

                        yield put(setItems({
                            done: false,
                            items: [item, ...(yield selectState()).todoItems],
                        }));
                        yield put(setCurrentItem(item));

                        yield put(message.actionCreators.clearMessage());
                    } catch (error) {
                        yield put(message.actionCreators.sendMessage(
                            "Failed to create an item.",
                            { error: true }));
                    }
                }),
            takeEvery(
                getItems.started,
                function* _(): SagaIterator {
                    yield put(getItems.done({
                        params: null,
                        result: yield all({
                            doneItems: call(repository(true).get),
                            todoItems: call(repository(false).get),
                        }),
                    }));
                }),
            takeEvery(
                toggleItemState,
                function* _(item): SagaIterator {
                    const { doneItems, todoItems } = yield selectState();

                    yield put(removeItem(item));

                    const done = !include(doneItems, item);

                    yield put(setItems({
                        done,
                        items: [
                            options.onToggleTaskState(item),
                            ...(done ? doneItems : todoItems),
                        ],
                    }));
                }),
            takeEvery(
                removeItem,
                function* _(item): SagaIterator {
                    const { doneItems, todoItems } = yield selectState();
                    const done = include(doneItems, item);
                    const items = [...(done ? doneItems : todoItems)];

                    remove(items, { id: item.id });

                    yield put(setItems({ done, items }));
                }),
            takeEvery(
                setItems,
                function* _({ done, items }): SagaIterator {
                    yield call(repository(done).set, items);
                }),
        ],
        selectState,
    };
}
