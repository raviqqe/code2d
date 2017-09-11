import * as React from "react";
import { connect } from "react-redux";

import { IBook } from "../lib/books";
import "./style/Book.css";

interface IState {
    showButtons: boolean;
}

export default class extends React.Component<IBook, IState> {
    public state: IState = { showButtons: false };

    public render() {
        const { imageUri, pageUri, publisher, title } = this.props;

        return (
            <div
                className="Book-container"
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <a href={pageUri} target="_blank"><img src={imageUri} /></a>
                <div className="Book-details">
                    <div>{title}</div>
                    <div className="Book-publisher">{publisher}</div>
                </div>
            </div>
        );
    }
}
