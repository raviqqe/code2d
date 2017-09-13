import * as _ from "lodash";
import * as React from "react";
import Check = require("react-icons/lib/md/check");
import Trash = require("react-icons/lib/md/delete");
import Repeat = require("react-icons/lib/md/replay");

import { IItem } from "../lib/items";
import ItemName from "./ItemName";
import "./style/Item.css";

interface IProps<A extends IItem> {
    buttons?: any[];
    currentItem: A | null;
    detailed: boolean;
    details: any;
    done?: boolean;
    item: A;
    onEditName?: (name: string) => void;
    removeItem: (item: A) => void;
    setCurrentItem: (item: A | null) => void;
    toggleItemState: (item: A) => void;
}

interface IState {
    showButtons: boolean;
}

export default class Item<A extends IItem> extends React.Component<IProps<A>, IState> {
    public state: IState = { showButtons: false };

    public render() {
        const { detailed, details, item, onEditName, setCurrentItem } = this.props;

        return (
            <div
                className={!detailed && this.isCurrentItem
                    ? "Item-container-highlighted"
                    : "Item-container"}
                onClick={detailed ? undefined : () => setCurrentItem(item)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Item-header">
                    <ItemName
                        text={name}
                        onEdit={onEditName}
                    />
                    {this.buttons}
                </div>
                {detailed && details}
            </div>
        );
    }

    private get buttons() {
        const { detailed, done, item, removeItem, toggleItemState } = this.props;
        const buttons = [(
            <div
                key="toggleState"
                className="Item-button"
                onClick={(event) => {
                    toggleItemState(item);
                    event.stopPropagation();
                }}
            >
                {done ? <Repeat /> : <Check />}
            </div>
        )];

        if (!done && _.isArray(this.props.buttons)) {
            buttons.push(...this.props.buttons);
        }

        if (detailed) {
            buttons.push(
                <div
                    key="trash"
                    className="Item-button"
                    onClick={(event) => {
                        removeItem(item);
                        event.stopPropagation();
                    }}
                >
                    <Trash />
                </div>,
            );
        }

        return (
            <div className="Item-buttons" style={this.buttonsStyle} >
                {buttons}
            </div>
        );
    }

    private get buttonsStyle() {
        if (this.state.showButtons) {
            return {};
        } else if (this.props.detailed) {
            return { display: "none" };
        }

        return { visibility: "hidden" };
    }

    private get isCurrentItem(): boolean {
        return _.isEqual(this.props.item, this.props.currentItem);
    }
}