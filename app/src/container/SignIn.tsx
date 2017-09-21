import * as React from "react";
import GitHub = require("react-icons/lib/go/mark-github");
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { actionCreators } from "../redux/sign-in";
import "./style/SignIn.css";

interface IProps {
    halfway: boolean;
    signedIn: boolean;
    signIn: () => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        if (this.props.signedIn) {
            return <Redirect to="/" />;
        } else if (this.props.halfway) {
            return <div className="SignIn-container">Signing in...</div>;
        }

        return (
            <div>
                <div className="SignIn-main">
                    <div className="SignIn-title-container">
                        <img className="SignIn-icon" src={require("../images/icon.svg")} />
                        <div className="SignIn-title">code2d</div>
                        <div className="SignIn-catch-phrase">
                            Productivity tools for software engineers.
                        </div>
                    </div>
                    <button className="SignIn-button" onClick={this.props.signIn}>
                        <GitHub /> Sign in with GitHub
                    </button>
                </div>
                <div className="SignIn-features-paper">
                    <div>
                        Manage everything to do in one place.
                        <div>Tasks to do</div>
                        <div>Articles to read</div>
                        <div>Videos to watch</div>
                        <div>Books to read (WIP)</div>
                    </div>
                    <div>
                        Keep other things away.
                        Focus on engineering and growing yourself.
                    </div>
                </div>
                <div className="SignIn-footer">
                    <a href="https://github.com/raviqqe/code2d" target="_blank">GitHub</a>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ authState, signIn }) => ({ ...authState, ...signIn }),
    actionCreators,
)(SignIn);
