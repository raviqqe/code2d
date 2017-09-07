import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import SignIn from "./SignIn";
import Tasks from "./Tasks";

class App extends React.Component<{ initialized: boolean }> {
    public render() {
        return (
            <BrowserRouter>
                <div style={this.props.initialized ? {} : { display: "none" }}>
                    <Route exact={true} path="/" render={() => <Redirect to="/tasks" />} />
                    <Route exact={true} path="/tasks" render={() => <Tasks />} />
                    <Route exact={true} path="/sign-in" component={SignIn} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(({ authState }) => authState)(App);
