import { sleep } from "common/utils";
import Immutable = require("seamless-immutable");

import createStore, { convertImmutableToMutable, convertMutableToImmutable } from "..";
import * as firebase from "../../infra/firebase";
import { initialState } from "../authentication";

jest.mock("../../infra/firebase", () => ({
    onAuthStateChanged(callback) {
        this.callback = callback;
    },
}));

jest.mock("../../infra/items-repository", () => ({
    default: class {
        public get = () => [];
    },
}));

jest.mock("../../infra/notification", () => ({
    permission: () => true,
    requestPermission: () => true,
}));

function getSignedInState(store): typeof initialState {
    return store.getState().authentication.signedIn;
}

it("calls auth state callback", async () => {
    expect.assertions(4);

    const store = createStore();
    const { callback } = firebase as any;

    expect(callback).not.toBe(undefined);
    expect(getSignedInState(store)).toBe(null);

    callback(null);
    await sleep(100);
    expect(getSignedInState(store)).toBe(false);

    callback({});
    await sleep(100);
    expect(getSignedInState(store)).toBe(true);
});

it("converts an immutable object to a mutable one", () => {
    expect((convertImmutableToMutable(Immutable({})) as any).asMutable).toBeUndefined();
});

it("converts a mutable object to an immutable one", () => {
    expect(convertMutableToImmutable({}).asMutable).toBeDefined();
});
