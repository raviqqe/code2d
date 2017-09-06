import { actionCreators, initialState, reducer } from "../sign-in";

it("tries to sign in", () => {
    expect(initialState.halfway).toBe(false);
    expect(reducer(initialState, actionCreators.signIn()).halfway).toBe(true);
});
