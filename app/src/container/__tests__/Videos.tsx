import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "../../redux";
import Videos from "../Videos";

it("renders a articles page", () => {
    ReactDOM.render(
        <Provider store={createStore()}><Videos /></Provider>,
        document.createElement("div"));
});
