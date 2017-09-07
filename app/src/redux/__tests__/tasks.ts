import createStore from "..";
import { sleep } from "../../lib/utils";
import { actionCreators, initialState, IState, reducer } from "../tasks";

jest.mock("../../lib/tasks");

function getState(store): IState {
    return store.getState().tasks;
}

it("creates a new task", async () => {
    expect.assertions(3 * 3);

    const store = createStore();

    const check = (creatingTask: boolean, name: string, description: string) => {
        const state = getState(store);

        expect(state.creatingTask).toBe(creatingTask);
        expect(state.newTask.name).toBe(name);
        expect(state.newTask.description).toBe(description);
    };

    store.dispatch(actionCreators.startCreatingTask());
    await sleep(100);

    check(true, "", "");

    store.dispatch(actionCreators.setNewTask({ name: "foo", description: "bar" }));
    await sleep(100);

    check(true, "foo", "bar");

    store.dispatch(actionCreators.createTask());
    await sleep(100);

    check(false, "", "");
});

it("cancels creating a new task", async () => {
    expect.assertions(3);

    const store = createStore();

    expect(getState(store).creatingTask).toBe(false);

    store.dispatch(actionCreators.startCreatingTask());
    await sleep(100);

    expect(getState(store).creatingTask).toBe(true);

    store.dispatch(actionCreators.stopCreatingTask());
    await sleep(100);

    expect(getState(store).creatingTask).toBe(false);
});

for (const done of [false, true]) {
    it(`Remove a ${done ? "done" : "todo"} task`, async () => {
        expect.assertions(4);

        const store = createStore();

        const tasksState = () => getState(store).tasks;
        const dispatch = async (action, length: number) => {
            store.dispatch(action);
            await sleep(100);
            expect(tasksState().length).toBe(length);
        };

        expect(tasksState().length).toBe(0);

        await dispatch(done ? actionCreators.toggleTasksState() : actionCreators.getTasks(), 1);
        await dispatch(actionCreators.removeTask(tasksState()[0]), 0);
        await dispatch(actionCreators.getTasks(), 0);
    });
}

it("toggles a tasks's state", async () => {
    expect.assertions(3);

    const store = createStore();
    const dispatch = async (action, length: number) => {
        store.dispatch(action);
        await sleep(100);
        expect(getState(store).tasks.length).toBe(length);
    };

    await dispatch(actionCreators.getTasks(), 1);
    await dispatch(actionCreators.toggleTaskState(getState(store).currentTask), 0);
    await dispatch(actionCreators.toggleTasksState(), 2);
});

it("updates a current task", async () => {
    expect.assertions(2);

    const store = createStore();

    const dispatch = async (action) => {
        store.dispatch(action);
        await sleep(100);
    };

    expect(getState(store).currentTask).toBe(null);

    await dispatch(actionCreators.getTasks());
    await dispatch(actionCreators.updateCurrentTask({
        ...(getState(store).currentTask),
        name: "foo bar baz",
    }));

    expect(getState(store).currentTask.name).toBe("foo bar baz");
});
