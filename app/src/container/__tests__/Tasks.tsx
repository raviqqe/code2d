import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "../../redux";
import Tasks from "../Tasks";

it("renders a todo tasks page", () => {
    ReactDOM.render(
        <Provider store={createStore()}><Tasks /></Provider>,
        document.createElement("div"));
});
