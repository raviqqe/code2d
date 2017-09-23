import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/articles";
import CreateArticle from "./CreateArticle";
import ItemsMenu from "./ItemsMenu";

interface IProps {
    done: boolean;
    toggleItemsState: () => void;
}

class ArticlesMenu extends React.Component<IProps> {
    public render() {
        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateArticle />}
                doneButtonText="read"
                todoButtonText="to read"
            />
        );
    }
}

export default connect(null, actionCreators)(ArticlesMenu);
