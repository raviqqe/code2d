import { IBook } from "common/domain/book";
import * as React from "react";
import { connect } from "react-redux";

import Book from "../component/Book";
import BooksMenu from "../component/BooksMenu";
import config from "../config";
import { actionCreators } from "../redux/books";
import Items from "./Items";

interface IProps {
    currentItem: IBook | null;
    doneItems: IBook[];
    setCurrentItem: (book: IBook) => void;
    setItems: (items: IBook[], done: boolean) => void;
    todoItems: IBook[];
}

class Books extends React.Component<IProps> {
    public render() {
        return <Items itemComponent={Book} menuComponent={BooksMenu} {...this.props} />;
    }

    public componentDidMount() {
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const script = document.createElement("script");

        script.id = "commissionJunction";
        script.src = config.commissionJunction.scriptSrc;
        script.async = true;

        const oldElement = document.getElementById(script.id);

        if (oldElement) {
            oldElement.remove();
        }

        document.body.appendChild(script);
    }
}

export default connect(({ books }) => books, actionCreators)(Books);
