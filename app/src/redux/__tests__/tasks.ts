import * as _ from "lodash";

import createStore from "..";
import { ITask, tasksRepository } from "../../lib/tasks";
import { dispatch } from "../../lib/utils";
import { actionCreators, IState } from "../tasks";

jest.mock("axios", () => ({ default: { get: () => ({ data: null }) } }));

jest.mock("../../lib/json", () => ({
    decode: () => [{
        createdAt: 42,
        description: "testDescription",
        id: "dummyId",
        name: "testName",
        spentSeconds: 42,
        tags: ["javascript"],
        updatedAt: 42,
    }],
    encode: () => undefined,
}));

const dummyTask: ITask = {
    createdAt: 42,
    description: "testDescription",
    id: "dummyId",
    name: "testName",
    spentSeconds: 42,
    tags: ["javascript"],
    updatedAt: 42,
};

function getState(store): IState {
    return store.getState().tasks;
}

beforeEach(() => {
    tasksRepository(false).initialize();
    tasksRepository(true).initialize();
});

it("updates a current task", async () => {
    expect.assertions(4);

    const store = createStore();

    expect(getState(store).currentItem).toBe(null);

    await dispatch(store, actionCreators.setItems([dummyTask], false));
    await dispatch(store, actionCreators.setCurrentItem(dummyTask));
    await dispatch(store, actionCreators.updateCurrentItem({
        ...(getState(store).currentItem),
        name: "foo bar baz",
    }));

    expect(getState(store).currentItem.name).toBe("foo bar baz");

    const updatedAt = getState(store).currentItem.updatedAt;

    await dispatch(store, actionCreators.updateCurrentItem({
        ...(getState(store).currentItem),
        name: "FOO BAR BAZ",
    }));

    const { currentItem } = getState(store);

    expect(currentItem.name).toBe("FOO BAR BAZ");
    expect(currentItem.updatedAt).not.toBe(updatedAt);
});

it("sets a current tag", async () => {
    expect.assertions(2);

    const store = createStore();

    expect(getState(store).currentTag).toBe(null);

    await dispatch(store, actionCreators.setCurrentTag("foo"));

    expect(getState(store).currentTag).toBe("foo");
});

it("gets tags", async () => {
    expect.assertions(2);

    const store = createStore();

    expect(getState(store).tags).toEqual([]);

    await dispatch(store, actionCreators.getTags());

    expect(getState(store).tags).toEqual(["javascript"]);
});

it("resets a current tag after creating a task", async () => {
    expect.assertions(3);

    const store = createStore();

    expect(getState(store).currentTag).toBe(null);
    await dispatch(store, actionCreators.setCurrentTag("foo"));
    expect(getState(store).currentTag).toBe("foo");
    await dispatch(store,
        actionCreators.createItem({ name: "foo", description: "bar", tags: [] }));
    expect(getState(store).currentTag).toBe(null);
});

it("toggles a task's state", async () => {
    expect.assertions(5);

    const store = createStore();
    const check = async (action, length: number) => {
        await dispatch(store, action);
        expect(getState(store).todoItems.length).toBe(length);
    };

    await check(actionCreators.setItems([{ ...dummyTask, id: "id0" }], false), 1);
    await check(actionCreators.setItems([{ ...dummyTask, id: "id1" }], true), 1);
    await check(actionCreators.toggleItemState(getState(store).todoItems[0]), 0);
    expect(getState(store).doneItems.length).toBe(2);
    expect(getState(store).doneItems[0].updatedAt).not.toBe(dummyTask.updatedAt);
});
