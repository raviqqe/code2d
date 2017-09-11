import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { IBook } from "../lib/books";
import Page from "./Page";
import "./style/Books.css";

interface IProps {
    books: IBook[];
    signedIn: boolean;
}

class Books extends React.Component<IProps> {
    public render() {
        return (
            <Page {...{ menu: false }}>
                {JSON.stringify(this.props.books)}
            </Page>
        );
    }
}

export default connect(({ books }) => books)(Books);
