import * as React from "react";
import { connect } from "react-redux";

import { IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import CreateMediaItem from "./CreateMediaItem";
import ItemsMenu from "./ItemsMenu";
import SimpleArticle from "./SimpleArticle";
import TrendingItems from "./TrendingItems";

interface IProps {
    createItem: (url: string) => void;
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
    trendingItems: IArticle[];
}

class ArticlesMenu extends React.Component<IProps> {
    public render() {
        const { createItem, trendingItems } = this.props;

        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateMediaItem createItem={createItem} placeholder="Article URL" />}
                doneButtonText="read"
                todoButtonText="to read"
            >
                <TrendingItems
                    itemComponent={SimpleArticle}
                    portrait={true}
                    trendingItems={trendingItems}
                />
            </ItemsMenu>
        );
    }
}

export default connect(({ articles }) => articles, actionCreators)(ArticlesMenu);
