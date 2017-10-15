import * as React from "react";

import { IArticle } from "../lib/articles";
import Image from "./Image";
import LabeledDate from "./LabeledDate";
import "./style/ArticleDetails.css";

interface IProps extends IArticle {
    detailed: boolean;
}

export default class extends React.Component<IProps> {
    public render() {
        const { date, detailed, image, text, url } = this.props;

        return [
            detailed && image && <Image key="image" href={url} src={image} />,
            <LabeledDate key="date" label="Edited on" value={date} />,
            detailed && text && <div key="text" className="ArticleDetails-text">{text}</div>,
        ];
    }
}
