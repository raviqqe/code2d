import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import createStore from "../../redux";
import Timer from "../Timer";

it("renders a full-screen timer", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <BrowserRouter>
                <div>
                    <Route exact={true} path="/" render={() => <Timer />} />
                </div>
            </BrowserRouter>
        </Provider>,
        document.createElement("div"));
});
