import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "../../redux";
import TasksMenu from "../TasksMenu";

it("renders a menu", () => {
    ReactDOM.render(
        <Provider store={createStore()}><TasksMenu /></Provider>,
        document.createElement("div"));
});
