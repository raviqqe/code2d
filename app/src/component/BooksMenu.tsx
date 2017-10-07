import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/books";
import CreateBook from "./CreateBook";
import ItemsMenu from "./ItemsMenu";

interface IProps {
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
}

class BooksMenu extends React.Component<IProps> {
    public render() {
        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateBook />}
                doneButtonText="read"
                todoButtonText="to read"
            />
        );
    }
}

export default connect(null, actionCreators)(BooksMenu);