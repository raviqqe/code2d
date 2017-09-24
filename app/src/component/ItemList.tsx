import * as React from "react";

import { isTouchDevice } from "../lib/device";
import { IItem } from "../lib/items";
import SortableItems from "./SortableItems";

interface IProps<A extends IItem> {
    component: any;
    currentItem: A | null;
    done: boolean;
    fixed?: boolean;
    items: A[];
    setCurrentItem: (item: A) => void;
    setItems: (args: { done: boolean, items: A[] }) => void;
}

export default class ItemList<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { component, currentItem, done, fixed, items, setItems } = this.props;

        if (items.length === 0) {
            return <div>There is no item.</div>;
        }

        return (
            <SortableItems
                component={component}
                currentItem={currentItem}
                done={done}
                fixed={fixed}
                items={items}
                setItems={setItems}
            />
        );
    }
}
