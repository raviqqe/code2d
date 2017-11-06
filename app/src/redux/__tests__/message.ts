import createStore from "..";
import { dispatch } from "../utils";
import { actionCreators, initialState, reducer } from "../message";

jest.useFakeTimers();

function getState(store): typeof initialState {
    return store.getState().message;
}

it("sets and clears a current message", () => {
    expect(initialState.message).toBe("");
    let state = reducer(initialState, actionCreators.sendMessage("Hello, world!"));
    expect(state.message).toBe("Hello, world!");
    state = reducer(state, actionCreators.clearMessage());
    expect(state.message).toBe("");
});

it("sends message", async () => {
    expect.assertions(2);

    const store = createStore();

    expect(initialState.message).toBe("");
    const promise = dispatch(store, actionCreators.sendMessage("Hello, world!"));
    jest.runAllTimers();
    await promise;
    expect(getState(store).message).toBe("");
});

it("sends a non-temporary message", async () => {
    expect.assertions(2);

    const store = createStore();

    expect(initialState.message).toBe("");
    const promise = dispatch(store, actionCreators.sendMessage("Hello, world!", { temporary: false }));
    jest.runAllTimers();
    await promise;
    expect(getState(store).message).toBe("Hello, world!");
});
