import * as React from "react";

import { IItem } from "../lib/items";
import Modal from "./Modal";
import "./style/TrendingItems.css";

interface IProps<A extends IItem> {
    itemComponent: (props) => JSX.Element;
    trendingItems: A[];
}

export default class TrendingItems<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { itemComponent, trendingItems } = this.props;
        const Item = itemComponent;

        if (!trendingItems || trendingItems.length === 0) {
            return false;
        }

        return (
            <Modal
                button={
                    ({ shown, showWindow }) =>
                        <div className="TrendingItems-button" onClick={showWindow}>
                            Trending
                        </div>}
                showCloseButton={true}
            >
                <div className="TrendingItems-container">
                    {trendingItems.map((item: A, index) =>
                        <Item key={index} {...item} />)}
                </div>
            </Modal>
        );
    }
}
