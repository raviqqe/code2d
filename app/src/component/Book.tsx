import * as React from "react";
import { connect } from "react-redux";

import { extractBook, IBook } from "../lib/books";
import { actionCreators } from "../redux/books";
import Image from "./Image";
import Item from "./Item";
import LabeledDate from "./LabeledDate";
import Link from "./Link";
import SubInformation from "./SubInformation";

interface IProps extends IBook {
    detailed: boolean;
    done: boolean;
    highlighted?: boolean;
    toggleItemState: (book: IBook) => void;
    removeItem: (book: IBook) => void;
    setCurrentItem: (book: IBook | null) => void;
}

class Book extends React.Component<IProps> {
    public render() {
        const { author, description, image, name, price, publisher, salesDate, url } = this.props;

        return (
            <Item
                {...this.props}
                details={[
                    image &&
                    <Image key="image" href={url} src={image} />,
                    description && <div key="description">{description}</div>,
                    author && <SubInformation key="author">Author: {author}</SubInformation>,
                    publisher &&
                    <SubInformation key="publisher">Publisher: {publisher}</SubInformation>,
                    <LabeledDate key="salesDate" label="Sales date" value={salesDate} />,
                    price && <SubInformation key="price">Price: {price}</SubInformation>,
                ]}
                href={url}
                item={extractBook(this.props)}
            />
        );
    }
}

export default connect(null, actionCreators)(Book);
