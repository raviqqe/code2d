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
            return <Redirect to="/tasks" />;
        } else if (this.props.halfway) {
            return <div className="SignIn-container">Signing in...</div>;
        }

        return (
            <div className="SignIn-container">
                <div className="SignIn-main-container">
                    <img className="SignIn-icon" src={require("../images/icon.svg")} />
                    <div className="SignIn-title">code2d</div>
                    <div className="SignIn-description">
                        Productivity tools for software engineers.
                    </div>
                </div>
                <button className="SignIn-button" onClick={this.props.signIn}>
                    <GitHub /> Sign in with GitHub
                </button>
            </div>
        );
    }
}

export default connect(
    ({ authState, signIn }) => ({ ...authState, ...signIn }),
    actionCreators,
)(SignIn);
