import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import * as firebase from "../../lib/firebase";
import createStore from "../../redux";
import App from "../App";

firebase.initialize();

it("renders without crashing", () => {
    ReactDOM.render(
        <Provider store={createStore()}><App /></Provider>,
        document.createElement("div"));
});
