import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { equal, IItem } from "../lib/items";
import "./style/SortableItems.css";

interface IProps<A extends IItem> {
    component: any;
    done: boolean;
    currentItem: A | null;
    items: A[];
}

class SortableItems<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { component, currentItem, done, items } = this.props;
        const SortableItem = SortableElement(component);

        return (
            <div className="SortableItems-container">
                {items.map((item, index) =>
                    <SortableItem
                        key={item.id}
                        index={index}
                        highlighted={currentItem && equal(item, currentItem)}
                        {...{ done, ...(item as any) }}
                    />)}
            </div>
        );
    }
}

export default SortableContainer(SortableItems);
