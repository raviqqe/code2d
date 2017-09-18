import * as React from "react";
import { connect } from "react-redux";

import Article from "../component/Article";
import ArticlesMenu from "../component/ArticlesMenu";
import ItemList from "../component/ItemList";
import { IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import Items from "./Items";

interface IProps {
    currentItem: IArticle | null;
    items: IArticle[];
    done: boolean;
    setCurrentItem: (article: IArticle) => void;
    setItems: (articles: IArticle[]) => void;
}

class Articles extends React.Component<IProps> {
    public render() {
        const { currentItem, done, items } = this.props;

        return (
            <Items
                currentItem={currentItem &&
                    <Article detailed={true} done={done} {...currentItem} />}
                list={
                    <ItemList
                        component={Article}
                        {...this.props}
                        items={items}
                    />}
                menu={<ArticlesMenu />}
            />
        );
    }
}

export default connect(({ articles }) => articles, actionCreators)(Articles);
