import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Book from "../component/Book";
import { IBook } from "../lib/books";
import Items from "./Items";
import "./style/Books.css";

interface IProps {
    books: IBook[];
    signedIn: boolean;
}

class Books extends React.Component<IProps> {
    public render() {
        return (
            <Items menu={false}>
                <div className="Books-container">
                    {this.renderBooks()}
                </div>
            </Items>
        );
    }

    private renderBooks() {
        if (this.props.books === null) {
            return "No book is available.";
        }

        return this.props.books.map((book, index) => <Book key={index} {...book} />);
    }
}

export default connect(({ books }) => books)(Books);
