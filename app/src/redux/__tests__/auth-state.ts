import { actionCreators, initialState, reducer } from "../auth-state";

it("initializes auth state", () => {
    expect(initialState.initialized).toBe(false);
    expect(reducer(initialState, actionCreators.initialize()).initialized).toBe(true);
});

it("changes auth state signed in", () => {
    expect(initialState.signedIn).toBe(false);
    expect(reducer(initialState, actionCreators.signIn()).signedIn).toBe(true);
});

it("changes auth state signed out", () => {
    expect(reducer(initialState.merge({ signedIn: true }), actionCreators.signOut()).signedIn)
        .toBe(false);
});
