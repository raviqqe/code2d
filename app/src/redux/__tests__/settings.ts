import createStore from "..";
import * as notification from "../../lib/notification";
import { dispatch } from "../utils";
import { actionCreators, initialState, reducer } from "../settings";

function getState(store): typeof initialState {
    return store.getState().settings;
}

jest.mock("../../lib/notification", () => ({
    permission: () => true,
    requestPermission: () => true,
}));

it("turns notification on", () => {
    expect(initialState.notificationOn).toBe(null);
    const state = reducer(initialState, actionCreators.setNotificationState(true));
    expect(state.notificationOn).toBe(true);
});

it("sets alarm volume", () => {
    expect(initialState.alarmVolume).not.toBe(0);
    const state = reducer(initialState, actionCreators.setAlarmVolume(0.75));
    expect(state.alarmVolume).toBe(0.75);
});

it("checks notification permission", async () => {
    expect.assertions(3);

    const store = createStore();
    const spy = jest.spyOn(notification, "permission");

    expect(initialState.notificationOn).toBe(null);
    await dispatch(store, actionCreators.checkNotificationPermission());
    expect(spy).toHaveBeenCalled();
    expect(getState(store).notificationOn).toBe(true);
});

it("requests notification permission", async () => {
    expect.assertions(3);

    const store = createStore();
    const spy = jest.spyOn(notification, "requestPermission");

    expect(initialState.notificationOn).toBe(null);
    await dispatch(store, actionCreators.requestNotificationPermission());
    expect(spy).toHaveBeenCalled();
    expect(getState(store).notificationOn).toBe(true);
});
