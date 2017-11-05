import { equal, IItem } from "common/domain/item";
import * as React from "react";
import Check = require("react-icons/lib/md/check");
import Trash = require("react-icons/lib/md/delete");
import Repeat = require("react-icons/lib/md/replay");

import ItemLike from "./ItemLike";
import ItemName from "./ItemName";
import "./style/Item.css";

interface IProps<A extends IItem> {
    buttons?: any[];
    detailed: boolean;
    details?: any;
    done: boolean;
    highlighted?: boolean;
    href?: string;
    item: A;
    nameIcon?: string;
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
        const { detailed, details, highlighted, href, item, nameIcon, onEditName, setCurrentItem }
            = this.props;

        return (
            <ItemLike
                onClick={detailed ? undefined : () => setCurrentItem(item)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Item-header">
                    <ItemName
                        highlighted={highlighted}
                        href={href}
                        icon={nameIcon}
                        onEdit={onEditName}
                        text={item.name}
                    />
                    {this.buttons}
                </div>
                {detailed && details}
            </ItemLike>
        );
    }

    private get buttons() {
        const { detailed, done, item, removeItem, toggleItemState } = this.props;

        const buttons: JSX.Element[] = [];

        if (!done || detailed) {
            buttons.push(
                <div
                    key="toggleState"
                    className="Item-button"
                    onClick={(event) => {
                        toggleItemState(item);
                        event.stopPropagation();
                    }}
                >
                    {done ? <Repeat /> : <Check />}
                </div>,
            );
        }

        if (!done && this.props.buttons) {
            buttons.push(...this.props.buttons);
        }

        if (done || detailed) {
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
            <div className={"Item-buttons" + (this.state.showButtons ? "" : "-hidden")}>
                {buttons}
            </div>
        );
    }
}
