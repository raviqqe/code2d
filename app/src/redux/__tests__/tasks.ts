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

it("Remove todo task", async () => {
    expect.assertions(4);

    const store = createStore();

    expect(getState(store).todoTasks.length).toBe(0);

    store.dispatch(actionCreators.getTodoTasks());
    await sleep(100);

    const tasks = getState(store).todoTasks;

    expect(tasks.length).toBe(1);

    store.dispatch(actionCreators.removeTodoTask(tasks[0]));
    await sleep(100);

    expect(getState(store).todoTasks.length).toBe(0);

    store.dispatch(actionCreators.getTodoTasks());
    await sleep(100);

    expect(getState(store).todoTasks.length).toBe(0);
});

it("Remove done task", async () => {
    expect.assertions(4);

    const store = createStore();

    expect(getState(store).doneTasks.length).toBe(0);

    store.dispatch(actionCreators.getDoneTasks());
    await sleep(100);

    const tasks = getState(store).doneTasks;

    expect(tasks.length).toBe(1);

    store.dispatch(actionCreators.removeDoneTask(tasks[0]));
    await sleep(100);

    expect(getState(store).doneTasks.length).toBe(0);

    store.dispatch(actionCreators.getDoneTasks());
    await sleep(100);

    expect(getState(store).doneTasks.length).toBe(0);
});
