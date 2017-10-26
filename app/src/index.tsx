import "normalize.css/normalize.css";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import config from "./config";
import App from "./container/App";
import "./index.css";
import * as analytics from "./lib/analytics";
import * as firebase from "./lib/firebase";
import createStore from "./redux";
import registerServiceWorker from "./register-service-worker";

analytics.initialize();
firebase.initialize();

const store = createStore();

render(<Provider store={store}><App /></Provider>, document.getElementById(config.rootId));
registerServiceWorker();
