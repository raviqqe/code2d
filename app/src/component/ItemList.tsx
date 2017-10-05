import * as React from "react";
import sortable = require("sortablejs");

import { equal, IItem } from "../lib/items";
import "./style/ItemList.css";

interface IProps<A extends IItem> {
    component: (props) => JSX.Element;
    currentItem: A | null;
    done: boolean;
    fixed?: boolean;
    items: A[];
    setItems: (items: A[], done: boolean) => void;
}

export default class ItemList<A extends IItem> extends React.Component<IProps<A>> {
    private sortable;
    private container: HTMLElement;

    public render() {
        const { component, currentItem, done, fixed, items, setItems } = this.props;
        const Item = component;

        if (items.length === 0) {
            return <div className="ItemList-container">There is no item.</div>;
        }

        return (
            <div ref={(container) => this.container = container} className="ItemList-container">
                {items.map((item) =>
                    <div key={item.id} className="ItemList-item">
                        <Item
                            done={done}
                            highlighted={currentItem && equal(item, currentItem)}
                            {...item}
                        />
                    </div>)}
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
                ghostClass: "ItemList-item-placeholder",
                onSort: ({ oldIndex, newIndex }) => {
                    const items = [...this.props.items];
                    items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
                    setItems(items, done);
                },
            });
        }

        this.sortable.option("disabled", fixed);
    }
}
