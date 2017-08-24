import * as React from "react";

import { isSignedIn } from "../lib/firebase";
import Main from "./Main";
import SignIn from "./SignIn";

export default class extends React.Component {
    public render() {
        return isSignedIn() ? <Main /> : <SignIn />;
    }
}
