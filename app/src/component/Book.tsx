import { extractBook, IBook } from "common/domain/book";
import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/books";
import BookDetails from "./BookDetails";
import Item from "./Item";

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
        const book = extractBook(this.props);

        return (
            <Item
                {...this.props}
                details={<BookDetails detailed={true} {...book} />}
                href={url}
                item={book}
            />
        );
    }
}

export default connect(null, actionCreators)(Book);
