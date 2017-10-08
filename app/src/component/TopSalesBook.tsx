import * as React from "react";
import { connect } from "react-redux";

import { IBook } from "../lib/books";
import { actionCreators } from "../redux/books";
import Button from "./Button";
import Image from "./Image";
import ItemLike from "./ItemLike";
import ItemName from "./ItemName";
import Link from "./Link";
import "./style/TopSalesBook.css";

class TopSalesBook extends React.Component<IBook> {
    public render() {
        const { author, image, name, publisher, url } = this.props;

        return (
            <ItemLike className="TopSalesBook-container">
                <ItemName href={url} text={name} />
                {author && <div>Author: {author}</div>}
                {publisher && <div>Publisher: {publisher}</div>}
                {image && <Image href={url} src={image} />}
                <Button onClick={() => undefined}>Add to list</Button>
            </ItemLike>
        );
    }
}

export default connect(null, actionCreators)(TopSalesBook);
