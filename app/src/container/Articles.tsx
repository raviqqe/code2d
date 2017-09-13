import * as React from "react";
import { connect } from "react-redux";

import AddArticle from "../component/AddArticle";
import Article from "../component/Article";
import { IArticle } from "../lib/articles";
import Page from "./Page";
import "./style/Articles.css";

interface IProps {
    articles: IArticle[];
    signedIn: boolean;
}

class Articles extends React.Component<IProps> {
    public render() {
        return (
            <Page menu={false}>
                <div className="Articles-container">
                    {this.renderArticles()}
                    <AddArticle />
                </div>
            </Page>
        );
    }

    private renderArticles() {
        if (this.props.articles === null) {
            return "No articles is available.";
        }

        return this.props.articles.map((article, index) => <Article key={index} {...article} />);
    }
}

export default connect(({ articles }) => articles)(Articles);
