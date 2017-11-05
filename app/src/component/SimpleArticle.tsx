import { extractArticle, IArticle } from "common/domain/article";
import * as React from "react";
import { connect } from "react-redux";

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
        const { addToTodoList, favicon, name, url } = this.props;
        const article = extractArticle(this.props);

        return (
            <ItemLike className="SimpleArticle-container">
                <div>
                    <ItemName href={url} icon={favicon} text={name} />
                    <ArticleDetails detailed={false} {...article} />
                </div>
                <Button onClick={() => addToTodoList(article)}>
                    Add to to-read list
                </Button>
            </ItemLike>
        );
    }
}

export default connect(null, actionCreators)(SimpleArticle);
