import * as React from "react";
import Done = require("react-icons/lib/md/check-box");
import Todo = require("react-icons/lib/md/check-box-outline-blank");
import Sort = require("react-icons/lib/md/sort");
import { connect } from "react-redux";

import IconedButton from "./IconedButton";
import NoBoxButton from "./NoBoxButton";
import PagesMenu from "./PagesMenu";
import Settings from "./Settings";
import "./style/ItemsMenu.css";

export interface IProps {
    createItem: JSX.Element;
    done: boolean;
    doneButtonText?: string;
    touchable: boolean;
    makeItemListSortable: () => void;
    todoButtonText?: string;
    onItemsStateChange: (done: boolean) => void;
}

class ItemsMenu extends React.Component<IProps> {
    public render() {
        const {
             createItem, children, done, doneButtonText, touchable,
            makeItemListSortable, todoButtonText, onItemsStateChange,
        } = this.props;

        return (
            <div className="ItemsMenu-container" onClick={(event) => event.stopPropagation()}>
                <div className="ItemsMenu-upper-container">
                    <div className="ItemsMenu-upper-background" />
                    <div className="ItemsMenu-upper-content">
                        <PagesMenu />
                    </div>
                </div>
                <div className="ItemsMenu-lower-container">
                    <div className="ItemsMenu-lower-background" />
                    <div className="ItemsMenu-lower-content">
                        <div className="ItemsMenu-lower-upper-container">
                            <div className="ItemsMenu-states">
                                <NoBoxButton
                                    className={!done && "ItemsMenu-state-highlighted"}
                                    icon={<Todo />}
                                    onClick={() => onItemsStateChange(false)}
                                >
                                    {todoButtonText || "to do"}
                                </NoBoxButton>
                                <NoBoxButton
                                    className={done && "ItemsMenu-state-highlighted"}
                                    icon={<Done />}
                                    onClick={() => onItemsStateChange(true)}
                                >
                                    {doneButtonText || "done"}
                                </NoBoxButton>
                            </div>
                            {!done && createItem}
                            {touchable &&
                                <IconedButton
                                    className="ItemsMenu-sort-button"
                                    icon={<Sort />}
                                    onClick={makeItemListSortable}
                                >
                                    sort
                                </IconedButton>}
                            {children}
                        </div>
                        <Settings />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ environment }) => environment)(ItemsMenu);
