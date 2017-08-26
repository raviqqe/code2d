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

        return <div onClick={this.props.signIn}>Sign in</div>;
    }
}

const mapStateToProps = ({ authState, signIn }) => ({ ...authState, ...signIn });

export default connect(mapStateToProps, actionCreators)(SignIn);
