import createStore from "..";
import { sleep } from "../../lib/utils";
import { actionCreators, initialState, IState, reducer } from "../tasks";

jest.mock("../../lib/tasks");

it("creates a new task", async () => {
    expect.assertions(3 * 3);

    const store = createStore();

    const check = (creatingTask: boolean, name: string, description: string) => {
        const state = (store.getState() as { tasks: IState }).tasks;

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
