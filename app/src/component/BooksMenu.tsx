import * as React from "react";
import { connect } from "react-redux";

import { IBook } from "../lib/books";
import CreateBook from "./CreateBook";
import ItemsMenu from "./ItemsMenu";
import SimpleBook from "./SimpleBook";
import TopSalesBooks from "./TopSalesBooks";
import TrendingItems from "./TrendingItems";

interface IProps {
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
    trendingItems: IBook[];
}

class BooksMenu extends React.Component<IProps> {
    public render() {
        const { trendingItems } = this.props;

        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateBook />}
                doneButtonText="read"
                todoButtonText="to read"
            >
                <TrendingItems itemComponent={SimpleBook} trendingItems={trendingItems} />
                <TopSalesBooks />
            </ItemsMenu>
        );
    }
}

export default connect(({ books }) => books)(BooksMenu);
