import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import Message from "../component/Message";
import Articles from "./Articles";
import SignIn from "./SignIn";
import Tasks from "./Tasks";
import Videos from "./Videos";

class App extends React.Component<{ signedIn: boolean | null }> {
    public render() {
        return (
            <BrowserRouter>
                <div style={this.props.signedIn === null ? { display: "none" } : {}}>
                    <Route exact={true} path="/index.html" render={() => <Redirect to="/" />} />
                    <Route exact={true} path="/" render={() => <Redirect to="/tasks" />} />
                    <Route exact={true} path="/tasks" render={() => <Tasks />} />
                    <Route exact={true} path="/articles" render={() => <Articles />} />
                    <Route exact={true} path="/videos" render={() => <Videos />} />
                    <Route exact={true} path="/sign-in" component={SignIn} />
                    <Message />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(({ authentication }) => authentication)(App);
