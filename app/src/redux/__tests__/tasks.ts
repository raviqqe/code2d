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

for (const done of [false, true]) {
    const todo = done ? "done" : "todo";

    it(`Remove a ${todo} task`, async () => {
        expect.assertions(4);

        const store = createStore();

        const tasksState = () => getState(store)[todo + "Tasks"];
        const getTasksAction = actionCreators.getTasks(done);

        expect(tasksState().length).toBe(0);

        store.dispatch(getTasksAction);
        await sleep(100);

        expect(tasksState().length).toBe(1);

        store.dispatch(actionCreators.removeTask(tasksState()[0]));
        await sleep(100);

        expect(tasksState().length).toBe(0);

        store.dispatch(getTasksAction);
        await sleep(100);

        expect(tasksState().length).toBe(0);
    });
}
