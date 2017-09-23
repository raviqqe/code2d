import * as React from "react";
import ScrollBar = require("react-perfect-scrollbar");
import "react-perfect-scrollbar/dist/css/styles.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { IItem } from "../lib/items";
import "./style/SortableItems.css";

interface IProps<A extends IItem> {
    component: any;
    done: boolean;
    items: A[];
}

class SortableItems<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { component, done, items } = this.props;
        const SortableItem = SortableElement(component);

        return (
            <ScrollBar>
                <div className="SortableItems-container">
                    {items.map((item, index) =>
                        <SortableItem key={index} index={index} {...{ done, ...(item as any) }} />)}
                </div>
            </ScrollBar>
        );
    }
}

export default SortableContainer(SortableItems);
