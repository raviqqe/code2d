import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Home";
import SignIn from "./SignIn";

export default class extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={Home} />
                    <Route path="/sign-in" component={SignIn} />
                </div>
            </BrowserRouter>
        );
    }
}
