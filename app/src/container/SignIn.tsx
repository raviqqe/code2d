import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { isSignedIn } from "../lib/firebase";
import actionCreators from "../redux/sign-in";

interface IProps {
    errorMessage: string;
    halfway: boolean;
    signIn: () => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        if (isSignedIn()) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <button onClick={this.props.signIn}>Sign in</button>
            </div>
        );
    }
}

export default connect(({ signIn }) => signIn, actionCreators)(SignIn);
