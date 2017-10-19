import * as React from "react";
import { connect } from "react-redux";

import { IBook } from "../lib/books";
import { actionCreators } from "../redux/books";
import CreateMediaItem from "./CreateMediaItem";
import ItemsMenu from "./ItemsMenu";
import SimpleBook from "./SimpleBook";
import TrendingItems from "./TrendingItems";

interface IProps {
    createItem: (url: string) => void;
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
    trendingItems: IBook[];
}

class BooksMenu extends React.Component<IProps> {
    public render() {
        const { createItem, trendingItems } = this.props;

        return (
            <ItemsMenu
                {...this.props}
                createItem={
                    <CreateMediaItem
                        createItem={createItem}
                        placeholder="Book URL of Rakuten Books or Better World Books"
                    />}
                doneButtonText="read"
                todoButtonText="to read"
            >
                <TrendingItems itemComponent={SimpleBook} trendingItems={trendingItems} />
            </ItemsMenu>
        );
    }
}

export default connect(({ books }) => books, actionCreators)(BooksMenu);
