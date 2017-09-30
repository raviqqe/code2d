import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { IItem } from "../../lib/items";
import StatefulItemsRepository from "../../lib/stateful_items_repository";
import { dispatch } from "../../lib/utils";
import createItemsDuck, { IState } from "../items";
import * as message from "../message";

jest.mock("axios", () => ({
    default: {
        get: (): Promise<{ data: ArrayBuffer }> => Promise.resolve({ data: new ArrayBuffer(0) }),
    },
}));

jest.mock("nanoid", () => (() => "dummyId"));

jest.mock("../../lib/json", () => ({
    decode: () => [{ name: "foo", data: "bar", id: "dummyId" }],
    encode: () => undefined,
}));

jest.mock("../message", () => ({
    actionCreators: { sendMessage: () => ({ type: "SEND_MESSAGE" }) },
}));

interface ITestItem extends IItem {
    data: string;
}

function createTestItemsDuck() {
    const repository = new StatefulItemsRepository<ITestItem>("items");
    return createItemsDuck("items", repository.state, (item: ITestItem) => {
        if (typeof item !== "object") {
            throw new Error("Failed to create an item.");
        }

        return item;
    });
}

function initialize() {
    const { actionCreators, reducer, sagas } = createTestItemsDuck();

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({ items: reducer }),
        compose(applyMiddleware(sagaMiddleware)));

    sagaMiddleware.run(function* _() {
        yield all(sagas);
    });

    return { actionCreators, store };
}

function getState(store): IState<ITestItem> {
    return store.getState().items;
}

it("creates an items duck", () => {
    createTestItemsDuck();
});

it("initializes a test", () => {
    const { actionCreators, store } = initialize();
    expect(actionCreators).not.toBe(undefined);
    expect(store).not.toBe(undefined);
});

it("creates a new item", async () => {
    expect.assertions(1);

    const { actionCreators, store } = initialize();

    await dispatch(store, actionCreators.createItem({ name: "foo", data: "bar" }));

    expect(getState(store).todoItems).toEqual([{ name: "foo", data: "bar", id: "dummyId" }]);
});

it("fails to create a new item", async () => {
    expect.assertions(1);

    const { actionCreators, store } = initialize();
    const spy = jest.spyOn(message.actionCreators, "sendMessage");

    await dispatch(store, actionCreators.createItem(undefined));
    expect(spy).toHaveBeenCalled();
});

for (const done of [false, true]) {
    it(`removes a ${done ? "done" : "todo"} item`, async () => {
        expect.assertions(4);

        const { actionCreators, store } = initialize();

        const itemsState = () => getState(store)[done ? "doneItems" : "todoItems"];
        const check = async (action, length: number) => {
            await dispatch(store, action);
            expect(itemsState().length).toBe(length);
        };

        expect(itemsState().length).toBe(0);

        await check(actionCreators.setItems([{ name: "", data: "", id: "id0" }], done), 1);
        await check(actionCreators.setItems([{ name: "", data: "", id: "id1" }], done), 1);
        await check(actionCreators.removeItem(itemsState()[0]), 0);
    });
}

it("sets a current item", async () => {
    expect.assertions(1);

    const { actionCreators, store } = initialize();

    await dispatch(store, actionCreators.setCurrentItem({ name: "foo", data: "bar", id: "dummyId" }));

    expect(getState(store).currentItem).toEqual({ name: "foo", data: "bar", id: "dummyId" });
});

for (const done of [false, true]) {
    it(`toggles a ${done ? "done" : "todo"}item's state`, async () => {
        expect.assertions(4);

        const mainItems = done ? "doneItems" : "todoItems";
        const subItems = done ? "todoItems" : "doneItems";

        const { actionCreators, store } = initialize();
        const check = async (action, length: number) => {
            await dispatch(store, action);
            expect(getState(store)[mainItems].length).toBe(length);
        };

        await check(actionCreators.setItems([{ name: "", data: "", id: "id0" }], done), 1);
        await check(actionCreators.setItems([{ name: "", data: "", id: "id1" }], !done), 1);
        await check(actionCreators.toggleItemState(getState(store)[mainItems][0]), 0);
        expect(getState(store)[subItems].length).toBe(2);
    });
}
