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
        } else if (this.props.halfway) {
            return <div>Signing in...</div>;
        }

        return <button onClick={this.props.signIn}>Sign in</button>;
    }
}

const mapStateToProps = ({ authState, signIn }) => ({ ...authState, ...signIn });

export default connect(mapStateToProps, actionCreators)(SignIn);
