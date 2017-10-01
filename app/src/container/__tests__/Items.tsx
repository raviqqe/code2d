import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { dispatch } from "../../lib/utils";
import createStore from "../../redux";
import { actionCreators, initialState } from "../../redux/authentication";
import Items from "../Items";

jest.mock("axios", () => ({ default: { get: () => ({ data: new ArrayBuffer(0) }) } }));
jest.mock("../../lib/json", () => ({ decode: () => [] }));

function getAuthenticationState(store): typeof initialState {
    return store.getState().authentication;
}

function renderItems(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Items
                currentItem={null}
                doneItems={[]}
                itemComponent={() => <div>item</div>}
                menuComponent={() => <div>menu</div>}
                setCurrentItem={() => undefined}
                setItems={() => undefined}
                todoItems={[]}
            />
        </Provider>,
        document.createElement("div"));
}

it("renders a items page while a user has signed out", () => {
    const store = createStore();

    expect(getAuthenticationState(store).signedIn).toBeFalsy();

    renderItems(store);
});

it("renders a items page while a user has signed in", async () => {
    const store = createStore();

    await dispatch(store, actionCreators.setSignInState(true));
    expect(getAuthenticationState(store).signedIn).toBe(true);

    renderItems(createStore());
});
