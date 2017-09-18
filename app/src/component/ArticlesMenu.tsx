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
        return <ItemsMenu {...this.props}><CreateArticle /></ItemsMenu>;
    }
}

export default connect(({ articles }) => articles, actionCreators)(ArticlesMenu);
