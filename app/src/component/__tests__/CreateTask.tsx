import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "../../redux";
import CreateTask from "../CreateTask";

it("renders a create-task button", () => {
    ReactDOM.render(
        <Provider store={createStore()}><CreateTask /></Provider>,
        document.createElement("div"));
});
