import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import createStore from "../../redux";
import Menu from "../Menu";

it("renders a menu", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <BrowserRouter>
                <div>
                    <Route exact={true} path="/" render={() => <Menu />} />
                </div>
            </BrowserRouter>
        </Provider>,
        document.createElement("div"));
});
