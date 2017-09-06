import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "../../redux";
import SignIn from "../SignIn";

it("renders without crashing", () => {
    ReactDOM.render(
        <Provider store={createStore()}><SignIn /></Provider>,
        document.createElement("div"));
});
