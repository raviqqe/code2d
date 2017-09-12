import * as React from "react";
import { connect } from "react-redux";

import { IArticle } from "../lib/articles";
import "./style/Article.css";

interface IState {
    showButtons: boolean;
}

export default class extends React.Component<IArticle, IState> {
    public state: IState = { showButtons: false };

    public render() {
        const { title, uri } = this.props;

        return (
            <div
                className="Article-container"
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <a href={uri} target="_blank">{title}</a>
            </div>
        );
    }
}
