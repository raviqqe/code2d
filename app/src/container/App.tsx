import * as React from "react";
import { connect } from "react-redux";

import Message from "../component/Message";
import { Page } from "../redux/pages";
import Articles from "./Articles";
import Books from "./Books";
import SignIn from "./SignIn";
import Tasks from "./Tasks";
import Videos from "./Videos";

interface IProps {
    currentPage: Page;
    signedIn: boolean | null;
}

class App extends React.Component<IProps> {
    public render() {
        const { currentPage, signedIn } = this.props;

        if (signedIn === null) {
            return false;
        }

        const Page = signedIn
            ? { articles: Articles, books: Books, tasks: Tasks, videos: Videos }[currentPage]
            : SignIn;

        return <div><Page /><Message /></div>;
    }
}

export default connect(({ authentication, pages }) => ({ ...authentication, ...pages }))(App);
