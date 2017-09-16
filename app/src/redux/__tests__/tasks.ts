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

function getState(store): IState {
    return store.getState().tasks;
}

beforeEach(() => {
    tasksRepository(false).initialize();
    tasksRepository(true).initialize();
});

it("creates a new task", async () => {
    expect.assertions(3);

    const store = createStore();

    expect(getState(store).items.length).toBe(0);

    await dispatch(store, actionCreators.startCreatingItem());
    expect(getState(store).creatingItem).toBe(true);

    await dispatch(store,
        actionCreators.createItem({ name: "foo", description: "bar", tags: [] }));
    expect(getState(store).items.length).toBe(1);
});

it("cancels creating a new task", async () => {
    expect.assertions(3);

    const store = createStore();

    expect(getState(store).creatingItem).toBe(false);

    await dispatch(store, actionCreators.startCreatingItem());
    expect(getState(store).creatingItem).toBe(true);

    await dispatch(store, actionCreators.stopCreatingItem());
    expect(getState(store).creatingItem).toBe(false);
});

for (const done of [false, true]) {
    it(`removes a ${done ? "done" : "todo"} task`, async () => {
        expect.assertions(4);

        const store = createStore();

        const tasksState = () => getState(store).items;
        const check = async (action, length: number) => {
            await dispatch(store, action);
            expect(tasksState().length).toBe(length);
        };

        expect(tasksState().length).toBe(0);

        await check(done ? actionCreators.toggleItemsState() : actionCreators.getItems(), 1);
        await check(actionCreators.removeItem(tasksState()[0]), 0);
        await check(actionCreators.getItems(), 0);
    });
}

it("toggles a task's state", async () => {
    expect.assertions(4);

    const store = createStore();
    const check = async (action, length: number) => {
        await dispatch(store, action);
        expect(getState(store).items.length).toBe(length);
    };

    await check(actionCreators.getItems(), 1);

    const { items: [{ updatedAt }] } = getState(store);

    await check(actionCreators.toggleItemState(getState(store).items[0]), 0);
    await check(actionCreators.toggleItemsState(), 2);

    const { items: [task] } = getState(store);

    expect(task.updatedAt).not.toBe(updatedAt);
});

it("updates a current task", async () => {
    expect.assertions(4);

    const store = createStore();

    expect(getState(store).currentItem).toBe(null);

    await dispatch(store, actionCreators.getItems());
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
