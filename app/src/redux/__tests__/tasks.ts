import * as _ from "lodash";

import createStore from "..";
import * as lib from "../../lib/tasks";
import { sleep } from "../../lib/utils";
import { actionCreators, IState } from "../tasks";

jest.mock("../../lib/tasks");

function getState(store): IState {
    return store.getState().tasks;
}

beforeEach(() => {
    lib.resetMocks();
});

it("creates a new task", async () => {
    expect.assertions(3 * 3);

    const store = createStore();

    const check = (creatingItem: boolean, name: string, description: string) => {
        const state = getState(store);

        expect(state.creatingItem).toBe(creatingItem);
        expect(state.newItem.name).toBe(name);
        expect(state.newItem.description).toBe(description);
    };

    store.dispatch(actionCreators.startCreatingItem());
    await sleep(100);

    check(true, "", "");

    store.dispatch(actionCreators.setNewItem({ name: "foo", description: "bar", tags: [] }));
    await sleep(100);

    check(true, "foo", "bar");

    store.dispatch(actionCreators.createItem());
    await sleep(100);

    check(false, "", "");
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

    await dispatch(actionCreators.toggleItemState(getState(store).currentItem), 0);
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
