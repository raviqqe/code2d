import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./app";

const root = document.createElement("div");
root.style.position = "fixed";
document.body.appendChild(root);

ReactDOM.render(<App />, root);
