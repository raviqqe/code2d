import * as React from "react";
import sortable = require("sortablejs");

import { equal, IItem } from "../lib/items";
import "./style/ItemList.css";

interface IProps<A extends IItem> {
    itemComponent: (props) => JSX.Element;
    currentItem: A | null;
    done: boolean;
    fixed?: boolean;
    items: A[];
    setItems: (items: A[], done: boolean) => void;
    style?: { [key: string]: any };
}

export default class ItemList<A extends IItem> extends React.Component<IProps<A>> {
    private sortable;
    private container: HTMLElement;

    public render() {
        const { itemComponent, currentItem, done, fixed, items, setItems, style } = this.props;
        const Item = itemComponent;

        if (items.length === 0) {
            return <div className="ItemList-message" style={style}>There is no item.</div>;
        }

        return (
            <div
                ref={(container) => this.container = container}
                className="ItemList-container"
                style={style}
            >
                {items.map((item) =>
                    <Item
                        key={item.id}
                        done={done}
                        highlighted={currentItem && equal(item, currentItem)}
                        {...item}
                    />)}
            </div>
        );
    }

    public componentDidMount() {
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const { done, fixed, setItems } = this.props;

        const element = this.container;

        if (!element) {
            return;
        }

        if (!this.sortable) {
            this.sortable = sortable.create(element, {
                animation: 200,
                ghostClass: "ItemList-placeholder",
                onSort: ({ oldIndex, newIndex }) => {
                    const items = [...this.props.items];
                    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
                    setItems(items, done);
                },
                scroll: true,
            });
        }

        this.sortable.option("disabled", fixed);
    }
}
