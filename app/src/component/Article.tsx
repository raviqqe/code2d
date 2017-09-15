import * as React from "react";
import { connect } from "react-redux";

import { IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import Item from "./Item";

interface IProps extends IArticle {
    currentItem: IArticle | null;
    detailed: boolean;
    done: boolean;
    toggleItemState: (article: IArticle) => void;
    removeItem: (article: IArticle) => void;
    setCurrentItem: (article: IArticle | null) => void;
}

class Article extends React.Component<IProps> {
    public render() {
        return (
            <Item {...this.props} item={this.article} />
        );
    }

    private get article(): IArticle {
        const { name, uri } = this.props;
        return { name, uri };
    }
}

export default connect(({ articles }) => articles, actionCreators)(Article);
