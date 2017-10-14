import * as React from "react";
import { connect } from "react-redux";

import { extractArticle, IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import ArticleDetails from "./ArticleDetails";
import Button from "./Button";
import ItemLike from "./ItemLike";
import ItemName from "./ItemName";
import "./style/SimpleArticle.css";

interface IProps extends IArticle {
    addToTodoList: (article: IArticle) => void;
}

class SimpleArticle extends React.Component<IProps> {
    public render() {
        const { addToTodoList, name, url } = this.props;
        const article = extractArticle(this.props);

        return (
            <ItemLike className="SimpleArticle-container">
                <ItemName href={url} text={name} />
                <ArticleDetails detailed={false} {...this.props} />
                <Button onClick={() => addToTodoList(article)}>
                    Add to to-do list
                </Button>
            </ItemLike>
        );
    }
}

export default connect(null, actionCreators)(SimpleArticle);
