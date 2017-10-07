import * as React from "react";
import { connect } from "react-redux";

import { IBook } from "../lib/books";
import { isDate } from "../lib/utils";
import { actionCreators } from "../redux/books";
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
        const { author, image, name, publisher, url } = this.book;

        return (
            <Item
                {...this.props}
                details={[
                    image &&
                    <Link key="image" href={url}>
                        <img className="Book-image" src={image} />
                    </Link>,
                    author && <SubInformation key="author">Author: {author}</SubInformation>,
                    publisher &&
                    <SubInformation key="publisher">Publisher: {publisher}</SubInformation>,
                ]}
                href={url}
                item={this.book}
            />
        );
    }

    private get book(): IBook {
        const { author, id, image, name, publisher, url } = this.props;
        return { author, id, image, name, publisher, url };
    }
}

export default connect(null, actionCreators)(Book);
