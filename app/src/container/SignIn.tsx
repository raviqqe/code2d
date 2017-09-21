import * as React from "react";
import GitHub = require("react-icons/lib/go/mark-github");
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Feature from "../component/Feature";
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
            <div className="SignIn-container">
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
                    <Feature
                        title="Manage everything to do"
                        image={require("../images/tasks.svg")}
                    >
                        Tasks to do.
                        Articles and videos to check.
                    </Feature>
                    <Feature
                        title="Built-in pomodoro timer"
                        image={require("../images/timer.svg")}
                    >
                        Use pomodoro technique
                        to be productive.
                    </Feature>
                    <Feature
                        title="Focus on engineering"
                        image={require("../images/focus.svg")}
                    >
                        Keep other things away
                        and grow yourself.
                    </Feature>
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
