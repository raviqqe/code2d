import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import createStore from "../../redux";
import Items from "../Items";

it("renders a todo tasks page", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <BrowserRouter>
                <div>
                    <Route
                        exact={true}
                        path="/"
                        render={() => <Items menu={<div>menu</div>}><div>main</div></Items>}
                    />
                    <Route
                        exact={true}
                        path="/sign-in"
                        render={() => <div>sign-in page mock</div>}
                    />
                </div>
            </BrowserRouter>
        </Provider>,
        document.createElement("div"));
});
