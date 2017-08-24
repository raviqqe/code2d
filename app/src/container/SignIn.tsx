import * as React from "react";
import { connect } from "react-redux";

import actionCreators from "../redux/sign-in";

interface IProps {
    errorMessage: string;
    halfway: boolean;
    signIn: () => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        return (
            <div onClick={this.props.signIn}>Sign in</div>
        );
    }
}

export default connect(({ signIn }) => signIn, actionCreators)(SignIn);
