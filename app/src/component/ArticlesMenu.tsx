import * as React from "react";
import { connect } from "react-redux";

import { IArticle } from "../lib/articles";
import CreateArticle from "./CreateArticle";
import ItemsMenu from "./ItemsMenu";
import SimpleArticle from "./SimpleArticle";
import TrendingItems from "./TrendingItems";

interface IProps {
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
    trendingItems: IArticle[];
}

class ArticlesMenu extends React.Component<IProps> {
    public render() {
        const { trendingItems } = this.props;

        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateArticle />}
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

export default connect(({ articles }) => articles)(ArticlesMenu);
