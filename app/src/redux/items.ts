import { remove } from "lodash";
import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { ImmutableObject } from "seamless-immutable";
import Immutable = require("seamless-immutable");
import actionCreatorFactory from "typescript-fsa";
import { ReducerBuilder, reducerWithInitialState } from "typescript-fsa-reducers";

import { IItem } from "../lib/items";
import ItemsRepository from "../lib/items_repository";
import { takeEvery } from "./utils";

export interface IState<A> {
    currentItem: A | null;
    done: boolean;
    items: A[];
}

export type Reducer<A, S extends IState<A>>
    = ReducerBuilder<ImmutableObject<S>, ImmutableObject<S>>;

export default function createItemsDuck<A extends IItem, B>(
    reducerName: string,
    repository: (done: boolean) => ItemsRepository<A>,
    initialize: (itemSource: B) => A,
    options: { partialInitialState?: {}, onToggleTaskState?: (item: A) => A } = {}) {
    options = Object.assign(
        { partialInitialState: {}, onToggleTaskState: (item: A): A => item },
        options);

    const factory = actionCreatorFactory(reducerName.toUpperCase());

    const createItem = factory<B>("CREATE_ITEM");
    const getItems = factory.async<void, A[]>("GET_ITEMS");
    const removeItem = factory<A>("REMOVE_ITEM");
    const setCurrentItem = factory<A | null>("SET_CURRENT_ITEM");
    const setItems = factory<A[]>("SET_ITEMS");
    const toggleItemState = factory<A>("TOGGLE_ITEM_STATE");
    const toggleItemsState = factory("TOGGLE_ITEMS_STATE");

    const initialState: ImmutableObject<IState<A>> = Immutable({
        ...options.partialInitialState,
        currentItem: null,
        done: false,
        items: [],
    });

    function selectState() {
        return select((state) => state[reducerName]);
    }

    function* getItemsSaga(): SagaIterator {
        yield put(getItems.done({
            params: null,
            result: yield call(repository((yield selectState()).done).get),
        }));
    }

    return {
        actionCreatorFactory: factory,
        actionCreators: {
            createItem,
            getItems: () => getItems.started(null),
            removeItem,
            setCurrentItem,
            setItems,
            toggleItemState,
            toggleItemsState,
        },
        initialState,
        reducer: reducerWithInitialState(initialState)
            .case(getItems.done, (state, { result }) => state.merge({ items: result }))
            .case(setCurrentItem, (state, currentItem) => state.merge({ currentItem }))
            .case(setItems, (state, items) => state.merge({ items }))
            .case(toggleItemsState, (state) => state.merge({ done: !state.done })),
        sagas: [
            takeEvery(
                createItem,
                function* _(itemSource: B): SagaIterator {
                    const item = yield call(initialize, itemSource);
                    yield put(setItems([item, ...(yield selectState()).items]));
                    yield put(setCurrentItem(item));
                }),
            takeEvery(getItems.started, getItemsSaga),
            takeEvery(toggleItemsState, getItemsSaga),
            takeEvery(
                toggleItemState,
                function* _(item: A): SagaIterator {
                    yield put(removeItem(item));
                    yield call(
                        repository(!(yield selectState()).done).create,
                        options.onToggleTaskState(item));
                }),
            takeEvery(
                removeItem,
                function* _(item: A): SagaIterator {
                    const items = [...(yield selectState()).items];

                    remove(items, item);

                    yield put(setItems(items));
                }),
            takeEvery(
                setItems,
                function* _(items: A[]): SagaIterator {
                    yield call(repository((yield selectState()).done).set, items);
                }),
        ],
        selectState,
    };
}
