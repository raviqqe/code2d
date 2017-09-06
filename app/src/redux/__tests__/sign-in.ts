import createStore from "..";
import { sleep } from "../../lib/utils";
import { actionCreators, initialState, reducer } from "../sign-in";

it("tries to sign in", () => {
    expect(initialState.halfway).toBe(false);
    expect(reducer(initialState, actionCreators.signIn()).halfway).toBe(true);
});

it("tries to sign in", async () => {
    expect.assertions(2);

    for (const mock of [{ signIn: () => undefined }, { signIn: () => { throw new Error(); } }]) {
        jest.doMock("../../lib/firebase", () => mock);

        const store = createStore();

        store.dispatch(actionCreators.signIn());
        await sleep(100);
        expect((store.getState() as any).signIn.halfway).toBe(false);
    }
});
