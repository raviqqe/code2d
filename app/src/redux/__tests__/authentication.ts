import { REHYDRATE } from "redux-persist/constants";

import createStore from "..";
import { dispatch } from "../../lib/utils";
import { actionCreators, initialState, reducer } from "../authentication";

jest.mock("../../lib/items_repository", () => ({
    default: class {
        public get = () => [];
    },
}));

jest.mock("../../lib/notification", () => ({
    permission: () => true,
    requestPermission: () => true,
}));

function getState(store): typeof initialState {
    return store.getState().authentication;
}

for (const signedIn of [true, false]) {
    it(`changes auth state signed ${signedIn ? " in " : "out"}`, async () => {
        const store = createStore();

        expect(getState(store).signedIn).toBe(null);
        await dispatch(store, actionCreators.setSignInState(signedIn));
        expect(getState(store).signedIn).toBe(signedIn);
    });
}

it("rehydrates redux store", async () => {
    const store = createStore();

    expect(getState(store).rehydrated).toBe(false);
    await dispatch(store, { payload: {}, type: REHYDRATE });
    expect(getState(store).rehydrated).toBe(true);
});
