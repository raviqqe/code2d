import { equal, IItem } from "common/domain/item";
import * as React from "react";
import sortable = require("sortablejs");

import ModalWindowButton from "./ModalWindowButton";
import "./style/ItemList.css";

interface IProps<A extends IItem> {
    itemComponent: (props) => JSX.Element;
    currentItem: A | null;
    done: boolean;
    fixed?: boolean;
    isSmallWindow: boolean;
    items: A[];
    setItems: (items: A[], done: boolean) => void;
    sorting?: boolean;
    style?: { [key: string]: any };
}

export default class ItemList<A extends IItem> extends React.Component<IProps<A>> {
    private sortable;
    private container: HTMLElement;

    public render() {
        const { itemComponent, currentItem, done, fixed, isSmallWindow, items, setItems, sorting, style }
            = this.props;
        const Item = itemComponent;

        if (items.length === 0) {
            return <div className="ItemList-message" style={style}>There is no item.</div>;
        }

        return (
            <div
                ref={(container) => this.container = container}
                className={"ItemList-container" + (sorting ? "-shadowed" : "")}
                style={style}
            >
                {items.map((item) =>
                    isSmallWindow ?
                        <ModalWindowButton
                            key={item.id}
                            buttonComponent={this.ClickableItem}
                            buttonProps={{ done, item }}
                        >
                            <Item detailed={true} done={done} {...item} />
                        </ModalWindowButton> :
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

    private ClickableItem = ({ done, openWindow, item }) => {
        const Item = this.props.itemComponent;

        return (
            <div onClick={openWindow}>
                <Item done={done} {...item} />
            </div>
        );
    }
}
