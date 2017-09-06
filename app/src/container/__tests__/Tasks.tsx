import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import createStore from "../../redux";
import Tasks from "../Tasks";

it("renders a todo tasks page", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <BrowserRouter>
                <div>
                    <Route exact={true} path="/" render={() => <Tasks />} />
                    <Route exact={true} path="/sign-in" render={() => <div>sign-in page mock</div>} />
                </div>
            </BrowserRouter>
        </Provider>,
        document.createElement("div"));
});

it("renders a done tasks page", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <BrowserRouter>
                <div>
                    <Route exact={true} path="/" render={() => <Tasks {...{ done: true }} />} />
                    <Route exact={true} path="/sign-in" render={() => <div>sign-in page mock</div>} />
                </div>
            </BrowserRouter>
        </Provider>,
        document.createElement("div"));
});
