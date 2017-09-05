import * as React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import SignIn from "./SignIn";
import Tasks from "./Tasks";

export default class extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path="/" render={() => <Redirect to="/tasks" />} />
                    <Route exact={true} path="/tasks" render={() => <Redirect to="/tasks/todo" />} />
                    <Route exact={true} path="/tasks/todo" render={() => <Tasks />} />
                    <Route exact={true} path="/tasks/done" render={() => <Tasks {...{ done: true }} />} />
                    <Route exact={true} path="/sign-in" component={SignIn} />
                </div>
            </BrowserRouter>
        );
    }
}
