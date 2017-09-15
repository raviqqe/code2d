import * as React from "react";
import { connect } from "react-redux";

import Article from "../component/Article";
import CreateArticle from "../component/CreateArticle";
import ItemList from "../component/ItemList";
import Menu from "../component/Menu";
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
                createItem={!done && <CreateArticle />}
                currentItem={currentItem &&
                    <Article detailed={true} done={done} {...currentItem} />}
                list={
                    <ItemList
                        component={Article}
                        {...this.props}
                        items={items}
                    />}
                menu={<Menu />}
            />
        );
    }
}

export default connect(({ articles }) => articles, actionCreators)(Articles);
