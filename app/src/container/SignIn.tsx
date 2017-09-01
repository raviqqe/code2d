import * as React from "react";
import { Github } from "react-feather";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import actionCreators from "../redux/sign-in";
import "./style/SignIn.css";

interface IProps {
    errorMessage: string;
    halfway: boolean;
    signedIn: boolean;
    signIn: () => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        if (this.props.signedIn) {
            return <Redirect to="/tasks" />;
        } else if (this.props.halfway) {
            return <div>Signing in...</div>;
        }

        return (
            <div className="SignIn-container">
                <div className="SignIn-main-container">
                    <div className="SignIn-title">code2d</div>
                    <div className="SignIn-description">
                        Productivity tools for software engineers.
                    </div>
                </div>
                <button className="SignIn-button" onClick={this.props.signIn}>
                    <div className="SignIn-icon"><Github /></div>
                    Sign in with GitHub
                </button>
            </div>
        );
    }
}

const mapStateToProps = ({ authState, signIn }) => ({ ...authState, ...signIn });

export default connect(mapStateToProps, actionCreators)(SignIn);
