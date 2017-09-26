import { REHYDRATE } from "redux-persist/constants";

import createStore from "..";
import * as firebase from "../../lib/firebase";
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

const rehydrateAction = { payload: {}, type: REHYDRATE };

function getState(store): typeof initialState {
    return store.getState().authentication;
}

for (const signedIn of [true, false]) {
    it(`changes auth state signed ${signedIn ? " in " : "out"}`, async () => {
        expect.assertions(2);

        const store = createStore();

        expect(getState(store).signedIn).toBe(null);
        await dispatch(store, actionCreators.setSignInState(signedIn));
        expect(getState(store).signedIn).toBe(signedIn);
    });
}

it("rehydrates redux store", async () => {
    expect.assertions(2);

    const store = createStore();

    expect(getState(store).rehydrated).toBe(false);
    await dispatch(store, rehydrateAction);
    expect(getState(store).rehydrated).toBe(true);
});

it("signs out", async () => {
    expect.assertions(1);

    const store = createStore();
    const spy = jest.spyOn(firebase, "signOut");

    await dispatch(store, actionCreators.signOut());
    expect(spy).toHaveBeenCalled();
});

it("deletes an account", async () => {
    expect.assertions(1);

    const store = createStore();
    const spy = jest.spyOn(firebase, "deleteAccount");

    await dispatch(store, actionCreators.deleteAccount());
    expect(spy).toHaveBeenCalled();
});

for (const rehydrateFirst of [true, false]) {
    it(`initializes redux store on ${rehydrateFirst ? "sign-in" : "rehydration"}`, async () => {
        expect.assertions(4);

        const store = createStore();

        expect(getState(store).rehydrated).toBe(false);
        expect(getState(store).signedIn).toBe(null);

        const rehydrate = async () => {
            await dispatch(store, rehydrateAction);
            expect(getState(store).rehydrated).toBe(true);
        };

        if (rehydrateFirst) {
            await rehydrate();
        }

        await dispatch(store, actionCreators.setSignInState(true));
        expect(getState(store).signedIn).toBe(true);

        if (!rehydrateFirst) {
            await rehydrate();
        }
    });
}
