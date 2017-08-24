import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import actionCreators from "../redux/sign-in";

interface IProps {
    errorMessage: string;
    halfway: boolean;
    signedIn: boolean;
    signIn: () => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        if (this.props.signedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <button onClick={this.props.signIn}>Sign in</button>
            </div>
        );
    }
}

export default connect(
    ({ authState, signIn }) => ({ ...authState, ...signIn }),
    actionCreators,
)(SignIn);
