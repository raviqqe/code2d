import { actionCreators, initialState, reducer } from "../timer";

it("toggles a timer", () => {
    expect(initialState.on).toBe(false);

    const state = reducer(initialState, actionCreators.toggleTimer());

    expect(state.on).toBe(true);
    expect(reducer(state, actionCreators.toggleTimer()).on).toBe(false);
});
