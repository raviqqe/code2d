import * as React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import SignIn from "./SignIn";
import Tasks from "./Tasks";

export default class extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" render={() => <Redirect to="/tasks" />} />
                    <Route path="/tasks" component={Tasks} />
                    <Route path="/sign-in" component={SignIn} />
                </div>
            </BrowserRouter>
        );
    }
}
