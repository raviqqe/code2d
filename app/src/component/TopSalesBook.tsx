import * as React from "react";
import { connect } from "react-redux";

import { extractBook, IBook } from "../lib/books";
import { actionCreators } from "../redux/books";
import BookDetails from "./BookDetails";
import Button from "./Button";
import Image from "./Image";
import ItemLike from "./ItemLike";
import ItemName from "./ItemName";
import Link from "./Link";
import "./style/TopSalesBook.css";

interface IProps extends IBook {
    addToTodoList: (book: IBook) => void;
}

class TopSalesBook extends React.Component<IProps> {
    public render() {
        const { addToTodoList, author, image, name, price, publisher, url } = this.props;
        const book = extractBook(this.props);

        return (
            <ItemLike className="TopSalesBook-container">
                <ItemName href={url} text={name} />
                <BookDetails detailed={false} {...book} />
                <Button onClick={() => addToTodoList(book)}>
                    Add to to-do list
                </Button>
            </ItemLike>
        );
    }
}

export default connect(null, actionCreators)(TopSalesBook);
