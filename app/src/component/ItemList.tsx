import * as React from "react";
import { arrayMove } from "react-sortable-hoc";

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
    setItems: (items: A[]) => void;
}

export default class ItemList<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { component, currentItem, done, items, setItems } = this.props;

        if (items.length === 0) {
            return <div>There is no item.</div>;
        }

        return (
            <SortableItems
                component={component}
                currentItem={currentItem}
                done={done}
                items={items}
                onSortEnd={({ newIndex, oldIndex }) =>
                    setItems(arrayMove([...items], oldIndex, newIndex))}
                {...this.sortableProps}
            />
        );
    }

    private get sortableProps(): { distance?: number, pressDelay?: number } {
        if (this.props.fixed) {
            return { distance: 2 ** 32 };
        }

        return isTouchDevice() ? { pressDelay: 200 } : { distance: 5 };
    }
}
