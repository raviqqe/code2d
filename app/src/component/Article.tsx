import * as React from "react";
import { connect } from "react-redux";

import { IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";
import Item from "./Item";
import LabeledDate from "./LabeledDate";
import "./style/Article.css";

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
        const { date, favicon, image, name, text, uri } = this.article;

        return (
            <Item
                {...this.props}
                details={[
                    image &&
                    <a key="image" href={uri} target="_blank">
                        <img className="Article-image" src={image} />
                    </a>,
                    text && <div key="text">{text}</div>,
                    date &&
                    <LabeledDate key="date" label="Edited on" value={date} />,
                ]}
                href={uri}
                item={this.article}
            />
        );
    }

    private get article(): IArticle {
        const { date, favicon, id, image, name, text, uri } = this.props;
        return { date, favicon, id, image, name, text, uri };
    }
}

export default connect(({ articles }) => articles, actionCreators)(Article);
