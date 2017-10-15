import * as React from "react";
import { connect } from "react-redux";

import { extractArticle, IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import ArticleDetails from "./ArticleDetails";
import Item from "./Item";

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
        const article = extractArticle(this.props);

        return (
            <Item
                {...this.props}
                details={<ArticleDetails detailed={true} {...article} />}
                href={article.url}
                item={article}
                nameIcon={article.favicon}
            />
        );
    }
}

export default connect(null, actionCreators)(Article);
