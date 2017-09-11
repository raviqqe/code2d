import * as _ from "lodash";

import createStore from "..";
import { sleep } from "../../lib/utils";
import { actionCreators, IState, reducer } from "../books";

jest.mock("../../lib/functions", () => ({ call: () => [] }));

function getState(store): IState {
    return store.getState().books;
}

it("gets books", async () => {
    expect.assertions(2);

    const store = createStore();

    const dispatch = async (action) => {
        store.dispatch(action);
        await sleep(100);
    };

    expect(getState(store).books).toBe(null);

    await dispatch(actionCreators.getBooks());

    expect(getState(store).books).toEqual([]);
});
