import createStore from "..";
import * as audio from "../../infra/audio";
import { dispatch } from "../utils";
import { actionCreators, initialState, reducer } from "../timer";

it("toggles a timer", () => {
    expect(initialState.on).toBe(false);

    const state = reducer(initialState, actionCreators.toggleTimer());

    expect(state.on).toBe(true);
    expect(reducer(state, actionCreators.toggleTimer()).on).toBe(false);
});

it("plays alarm", async () => {
    const spy = jest.spyOn(audio, "playAlarm");
    const store = createStore();

    await dispatch(store, actionCreators.playAlarm());
    expect(spy).toHaveBeenCalled();
});
