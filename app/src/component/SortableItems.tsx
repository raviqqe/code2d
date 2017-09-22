import * as React from "react";
import ScrollBar = require("react-perfect-scrollbar");
import "react-perfect-scrollbar/dist/css/styles.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { IItem } from "../lib/items";
import "./style/SortableItems.css";

class SortableItems<A extends IItem> extends React.Component<{ component: any, items: A[] }> {
    public render() {
        const { component, items } = this.props;
        const SortableItem = SortableElement(component);

        return (
            <ScrollBar>
                <div className="SortableItems-container">
                    {items.map((item, index) =>
                        <SortableItem key={index} index={index} {...item} />)}
                </div>
            </ScrollBar>
        );
    }
}

export default SortableContainer(SortableItems);
