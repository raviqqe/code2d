import createStore from "..";
import * as firebase from "../../lib/firebase";
import { sleep } from "../../lib/utils";
import { initialState } from "../authentication";

jest.mock("../../lib/firebase", () => ({
    onAuthStateChanged(callback) {
        this.callback = callback;
    },
}));

jest.mock("../../lib/items_repository", () => ({
    default: class {
        public get = () => [];
    },
}));

jest.mock("../../lib/notification", () => ({
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
