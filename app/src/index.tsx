import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./container/App";
import "./index.css";
import * as firebase from "./lib/firebase";
import createStore from "./redux";
import registerServiceWorker from "./register-service-worker";

firebase.initialize();

const store = createStore();

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root") as HTMLElement);
registerServiceWorker();
