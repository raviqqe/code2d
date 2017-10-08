import * as React from "react";
import { connect } from "react-redux";

import { extractBook, IBook } from "../lib/books";
import { actionCreators } from "../redux/books";
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

        return (
            <ItemLike className="TopSalesBook-container">
                <ItemName href={url} text={name} />
                {author && <div>Author: {author}</div>}
                {publisher && <div>Publisher: {publisher}</div>}
                {price && <div>Price: {price}</div>}
                {image && <Image href={url} src={image} />}
                <Button onClick={() => addToTodoList(extractBook(this.props))}>
                    Add to to-do list
                </Button>
            </ItemLike>
        );
    }
}

export default connect(null, actionCreators)(TopSalesBook);
