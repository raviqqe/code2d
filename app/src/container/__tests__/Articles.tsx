import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "../../redux";
import Articles from "../Articles";

it("renders a articles page", () => {
    ReactDOM.render(
        <Provider store={createStore()}><Articles /></Provider>,
        document.createElement("div"));
});
