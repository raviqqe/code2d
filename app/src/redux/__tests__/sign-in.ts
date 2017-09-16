import createStore from "..";
import { dispatch } from "../../lib/utils";
import { actionCreators, initialState, reducer } from "../sign-in";

it("tries to sign in", () => {
    expect(initialState.halfway).toBe(false);
    expect(reducer(initialState, actionCreators.signIn()).halfway).toBe(true);
});

for (const signIn of [() => undefined, () => { throw new Error(); }]) {
    it("tries to sign in", async () => {
        expect.assertions(1);

        jest.resetModules();
        jest.doMock("../../lib/firebase", () => ({ signIn, onAuthStateChanged: () => undefined }));

        const store = require("..").default();

        await dispatch(store, actionCreators.signIn());
        expect((store.getState() as any).signIn.halfway).toBe(false);

        jest.dontMock("../../lib/firebase");
    });
}
