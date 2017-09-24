import * as React from "react";
import { connect } from "react-redux";

import Article from "../component/Article";
import ArticlesMenu from "../component/ArticlesMenu";
import { IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import Items from "./Items";

interface IProps {
    currentItem: IArticle | null;
    doneItems: IArticle[];
    setCurrentItem: (article: IArticle) => void;
    setItems: (items: IArticle[], done: boolean) => void;
    todoItems: IArticle[];
}

class Articles extends React.Component<IProps> {
    public render() {
        return <Items itemComponent={Article} menuComponent={ArticlesMenu} {...this.props} />;
    }
}

export default connect(({ articles }) => articles, actionCreators)(Articles);
