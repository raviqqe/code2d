import * as _ from "lodash";
import * as React from "react";
import { arrayMove } from "react-sortable-hoc";

import { isTouchDevice } from "../lib/device";
import { IItem } from "../lib/items";
import SortableItems from "./SortableItems";
import "./style/ItemList.css";

interface IProps<A extends IItem> {
    component: any;
    currentItem: A | null;
    fixed?: boolean;
    items: A[];
    setCurrentItem: (item: A) => void;
    setItems: (items: A[]) => void;
}

export default class ItemList<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { component, items, setItems } = this.props;

        if (items.length === 0) {
            return <div>There is no item.</div>;
        }

        return (
            <div className="ItemList-container">
                <SortableItems
                    component={component}
                    items={items}
                    onSortEnd={({ newIndex, oldIndex }) =>
                        setItems(arrayMove([...items], oldIndex, newIndex))}
                    {...this.sortableProps}
                />
            </div>
        );
    }

    public componentDidMount() {
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const { currentItem, items, setCurrentItem } = this.props;

        if (currentItem === null || !_.find(items, currentItem)) {
            setCurrentItem(items[0] || null);
        }
    }

    private get sortableProps(): { distance?: number, pressDelay?: number } {
        if (this.props.fixed) {
            return { distance: 2 ** 32 };
        }

        return isTouchDevice() ? { pressDelay: 200 } : { distance: 5 };
    }
}
