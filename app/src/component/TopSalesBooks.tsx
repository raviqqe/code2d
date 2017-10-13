import * as React from "react";
import { connect } from "react-redux";

import { IBook } from "../lib/books";
import { actionCreators } from "../redux/books";
import Modal from "./Modal";
import SimpleBook from "./SimpleBook";
import "./style/TopSalesBooks.css";

interface IProps {
    topSalesBooks: IBook[];
}

class TopSalesBooks extends React.Component<IProps> {
    public render() {
        const { topSalesBooks } = this.props;

        return (
            <Modal
                button={
                    ({ shown, showWindow }) =>
                        <div className="TopSalesBooks-button" onClick={showWindow}>
                            Top Sales
                        </div>}
                showCloseButton={true}
            >
                <div className="TopSalesBooks-container">
                    {topSalesBooks.map((book: IBook, index) =>
                        <SimpleBook key={index} {...book} />)}
                </div>
            </Modal>
        );
    }
}

export default connect(({ books }) => books, actionCreators)(TopSalesBooks);
