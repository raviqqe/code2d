import * as React from "react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { connect } from "react-redux";

import actionCreators from "../redux/sign-in";

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
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    scope="email"
                    onSuccess={({ getAuthResponse }: GoogleLoginResponse) => {
                        const token = getAuthResponse().id_token;
                        console.log({ token });
                        this.props.signIn({ token });
                    }}
                    onFailure={({ details }: { details: string }) => {
                        console.error(details);
                    }}
                />
            </div>
        );
    }
}

export default connect(({ signIn }) => signIn, actionCreators)(SignIn);
