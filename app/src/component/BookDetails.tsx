import * as React from "react";

import { IBook } from "../lib/books";
import Image from "./Image";
import LabeledDate from "./LabeledDate";
import SubInformation from "./SubInformation";

interface IProps extends IBook {
    detailed: boolean;
}

export default class extends React.Component<IProps> {
    public render() {
        const { author, description, detailed, image, price, publisher, salesDate, url }
            = this.props;

        const imageElement = image && <Image key="image" href={url} src={image} />;

        const details = [
            detailed && description && <div key="description">{description}</div>,
            author && <SubInformation key="author">Author: {author}</SubInformation>,
            publisher && <SubInformation key="publisher">Publisher: {publisher}</SubInformation>,
            <LabeledDate key="salesDate" label="Sales date" value={salesDate} />,
            price && <SubInformation key="price">Price: {price}</SubInformation>,
        ];

        if (detailed) {
            return [imageElement, ...details];
        }

        return [...details, imageElement];
    }
}
