import * as React from "react";
import { GoogleLogin } from "react-google-login-component";

export default class extends React.Component {
    public render() {
        return (
            <div>
                <GoogleLogin
                    socialId="yourClientID"
                    className="google-login"
                    scope="email"
                    responseHandler={(user) => {
                        const token = user.getAuthResponse().id_token;
                        console.log({ accessToken: token });
                    }}
                    buttonText="Sign in"
                />
            </div>
        );
    }
}
