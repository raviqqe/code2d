import * as React from "react";
import { GoogleLogin } from "react-google-login-component";
import { connect } from "react-redux";

import actionCreators from "./redux/sign-in";

interface IProps {
    errorMessage: string;
    halfway: boolean;
    signIn: (args: { token: string }) => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        return (
            <div>
                <GoogleLogin
                    socialId="yourClientID"
                    className="google-login"
                    scope="email"
                    responseHandler={(user) => {
                        const token: string = user.getAuthResponse().id_token;
                        console.log({ accessToken: token });
                        this.props.signIn({ token });
                    }}
                    buttonText="Sign in"
                />
            </div>
        );
    }
}

export default connect(({ signIn }) => signIn, actionCreators)(SignIn);
