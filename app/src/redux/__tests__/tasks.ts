import * as _ from "lodash";

import createStore from "..";
import { ITask, tasksRepository } from "../../lib/tasks";
import { sleep } from "../../lib/utils";
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

async function dispatch(store, action) {
    store.dispatch(action);
    await sleep(100);
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

    store.dispatch(actionCreators.startCreatingItem());
    await sleep(100);

    expect(getState(store).creatingItem).toBe(true);

    store.dispatch(actionCreators.stopCreatingItem());
    await sleep(100);

    expect(getState(store).creatingItem).toBe(false);
});

for (const done of [false, true]) {
    it(`removes a ${done ? "done" : "todo"} task`, async () => {
        expect.assertions(4);

        const store = createStore();

        const tasksState = () => getState(store).items;
        const dispatch = async (action, length: number) => {
            store.dispatch(action);
            await sleep(100);
            expect(tasksState().length).toBe(length);
        };

        expect(tasksState().length).toBe(0);

        await dispatch(done ? actionCreators.toggleItemsState() : actionCreators.getItems(), 1);
        await dispatch(actionCreators.removeItem(tasksState()[0]), 0);
        await dispatch(actionCreators.getItems(), 0);
    });
}

it("toggles a task's state", async () => {
    expect.assertions(4);

    const store = createStore();
    const dispatch = async (action, length: number) => {
        store.dispatch(action);
        await sleep(100);
        expect(getState(store).items.length).toBe(length);
    };

    await dispatch(actionCreators.getItems(), 1);

    const { items: [{ updatedAt }] } = getState(store);

    await dispatch(actionCreators.toggleItemState(getState(store).items[0]), 0);
    await dispatch(actionCreators.toggleItemsState(), 2);

    const { items: [task] } = getState(store);

    expect(task.updatedAt).not.toBe(updatedAt);
});

it("updates a current task", async () => {
    expect.assertions(4);

    const store = createStore();

    const dispatch = async (action) => {
        store.dispatch(action);
        await sleep(100);
    };

    expect(getState(store).currentItem).toBe(null);

    await dispatch(actionCreators.getItems());
    await dispatch(actionCreators.updateCurrentItem({
        ...(getState(store).currentItem),
        name: "foo bar baz",
    }));

    expect(getState(store).currentItem.name).toBe("foo bar baz");

    const updatedAt = getState(store).currentItem.updatedAt;

    await dispatch(actionCreators.updateCurrentItem({
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

    const dispatch = async (action) => {
        store.dispatch(action);
        await sleep(100);
    };

    expect(getState(store).currentTag).toBe(null);

    await dispatch(actionCreators.setCurrentTag("foo"));

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
