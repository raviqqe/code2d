import * as React from "react";

import { IItem } from "../lib/items";
import Modal from "./Modal";
import "./style/TrendingItems.css";

interface IProps<A extends IItem> {
    itemComponent: (props) => JSX.Element;
    portrait?: boolean;
    trendingItems: A[];
}

export default class TrendingItems<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { itemComponent, portrait, trendingItems } = this.props;
        const Item = itemComponent;

        if (!trendingItems || trendingItems.length === 0) {
            return false;
        }

        return (
            <Modal
                button={
                    ({ opened, openWindow }) =>
                        <div className="TrendingItems-button" onClick={openWindow}>
                            Trending
                        </div>}
                showCloseButton={true}
            >
                <div className={"TrendingItems-container" + (portrait ? "-portrait" : "")}>
                    {trendingItems.map((item: A, index) =>
                        <Item key={index} {...item} />)}
                </div>
            </Modal>
        );
    }
}
