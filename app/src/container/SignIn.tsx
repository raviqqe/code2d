import * as React from "react";
import GitHub = require("react-icons/lib/go/mark-github");
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import FacebookButton from "../component/FacebookButton";
import Feature from "../component/Feature";
import TwitterButton from "../component/TwitterButton";
import { actionCreators as authenticationActionCreators } from "../redux/authentication";
import { actionCreators as messageActionCreators } from "../redux/message";
import "./style/SignIn.css";

interface IProps {
    sendMessage: (message: string) => void;
    signingIn: boolean;
    signedIn: boolean;
    signIn: () => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        if (this.props.signedIn) {
            return <Redirect to="/" />;
        } else if (this.props.signingIn) {
            this.props.sendMessage("Signing in...");
        }

        return (
            <div className="SignIn-container">
                <div className="SignIn-main">
                    <div className="SignIn-title-container">
                        <img className="SignIn-icon" src={require("../images/icon.svg")} />
                        <div className="SignIn-title">{process.env.REACT_APP_NAME}</div>
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
                        Manage tasks to do,
                        any web articles to read,
                        and YouTube videos to watch
                        in one place.
                    </Feature>
                    <Feature
                        title="Built-in pomodoro timer"
                        image={require("../images/timer.svg")}
                    >
                        Use pomodoro technique to be productive
                        and make your work done faster.
                    </Feature>
                    <Feature
                        title="Focus on engineering"
                        image={require("../images/focus.svg")}
                    >
                        Keep other things away and grow yourself.
                    </Feature>
                </div>
                <div className="SignIn-footer">
                    <FacebookButton />
                    <TwitterButton />
                    <a href={process.env.REACT_APP_FEEDBACK_URL} target="_blank">Feedback</a>
                    <a href={process.env.REACT_APP_REPOSITORY_URL} target="_blank">GitHub</a>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ authentication }) => authentication,
    { ...authenticationActionCreators, ...messageActionCreators },
)(SignIn);
