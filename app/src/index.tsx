import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import registerServiceWorker from "./register-service-worker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
