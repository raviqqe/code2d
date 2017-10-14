import * as React from "react";
import { connect } from "react-redux";

import { IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import ArticleDetails from "./ArticleDetails";
import Item from "./Item";
import LabeledDate from "./LabeledDate";
import Link from "./Link";
import "./style/Article.css";

interface IProps extends IArticle {
    detailed: boolean;
    done: boolean;
    highlighted?: boolean;
    toggleItemState: (article: IArticle) => void;
    removeItem: (article: IArticle) => void;
    setCurrentItem: (article: IArticle | null) => void;
}

class Article extends React.Component<IProps> {
    public render() {
        const { name, url } = this.article;

        return (
            <Item
                {...this.props}
                details={<ArticleDetails detailed={true} {...this.article} />}
                href={url}
                item={this.article}
            />
        );
    }

    private get article(): IArticle {
        const { date, favicon, id, image, name, text, url } = this.props;
        return { date, favicon, id, image, name, text, url };
    }
}

export default connect(null, actionCreators)(Article);
