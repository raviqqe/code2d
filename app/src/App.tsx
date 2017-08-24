import * as React from "react";

import Main from "./Main";
import SignIn from "./SignIn";

export default class extends React.Component {
    public render() {
        const signedIn = true;
        return signedIn ? <Main /> : <SignIn />;
    }
}
