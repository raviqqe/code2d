import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import createStore from "../../redux";
import TasksMenu from "../TasksMenu";

it("renders a menu", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <BrowserRouter>
                <div>
                    <Route exact={true} path="/" render={() => <TasksMenu />} />
                </div>
            </BrowserRouter>
        </Provider>,
        document.createElement("div"));
});
