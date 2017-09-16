import { REHYDRATE } from "redux-persist/constants";

import { actionCreators, initialState, reducer } from "../auth-state";

it("changes auth state signed in", () => {
    expect(initialState.signedIn).toBe(null);
    expect(reducer(initialState, actionCreators.signIn()).signedIn).toBe(true);
});

it("changes auth state signed out", () => {
    expect(reducer(initialState.merge({ signedIn: true }), actionCreators.signOut()).signedIn)
        .toBe(false);
});

it("rehydrates redux store", () => {
    expect(initialState.rehydrated).toBe(false);
    expect(reducer(initialState, { type: REHYDRATE }).rehydrated).toBe(true);
});
