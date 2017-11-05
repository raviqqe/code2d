import { convertCountryIntoBookStoreUrl } from "common/domain/book";
import * as React from "react";
import Search = require("react-icons/lib/md/search");
import { connect } from "react-redux";

import { IBook } from "../lib/books";
import { actionCreators } from "../redux/books";
import CreateMediaItem from "./CreateMediaItem";
import ItemsMenu from "./ItemsMenu";
import Link from "./Link";
import NoBoxButton from "./NoBoxButton";
import SimpleBook from "./SimpleBook";
import TrendingItems from "./TrendingItems";

interface IProps {
    country: string | null;
    createItem: (url: string) => void;
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
    trendingItems: IBook[];
}

class BooksMenu extends React.Component<IProps> {
    public render() {
        const { country, createItem, trendingItems } = this.props;

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
                <div>
                    <TrendingItems itemComponent={SimpleBook} trendingItems={trendingItems} />
                    {country &&
                        <Link href={convertCountryIntoBookStoreUrl(country)}>
                            <NoBoxButton
                                icon={<Search />}
                                onClick={() => undefined}
                            >
                                Search
                            </NoBoxButton>
                        </Link>}
                </div>
            </ItemsMenu>
        );
    }
}

export default connect(
    ({ books, environment }) => ({ ...books, ...environment }),
    actionCreators,
)(BooksMenu);
