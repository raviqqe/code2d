import createStore from "..";
import { dispatch } from "../../lib/utils";
import { actionCreators, IState } from "../books";

jest.mock("../../lib/functions", () => ({ call: () => [] }));

function getState(store): IState {
    return store.getState().books;
}

it("gets books", async () => {
    expect.assertions(2);

    const store = createStore();

    expect(getState(store).books).toBe(null);

    await dispatch(store, actionCreators.getBooks());

    expect(getState(store).books).toEqual([]);
});
