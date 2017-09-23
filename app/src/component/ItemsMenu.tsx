import * as React from "react";
import Done = require("react-icons/lib/md/check-box");
import Todo = require("react-icons/lib/md/check-box-outline-blank");

import PagesMenu from "./PagesMenu";
import SettingsButton from "./SettingsButton";
import "./style/ItemsMenu.css";

interface IProps {
    createItem: JSX.Element;
    done: boolean;
    doneButtonText?: string;
    todoButtonText?: string;
    onItemsStateChange: (done: boolean) => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { createItem, children, done, doneButtonText, todoButtonText, onItemsStateChange }
            = this.props;

        return (
            <div className="ItemsMenu-container">
                <div className="ItemsMenu-main">
                    <div className="ItemsMenu-states">
                        <div
                            className={done ? "ItemsMenu-state" : "ItemsMenu-state-highlighted"}
                            onClick={() => onItemsStateChange(false)}
                        >
                            <Todo /> {todoButtonText || "to do"}
                        </div>
                        <div
                            className={done ? "ItemsMenu-state-highlighted" : "ItemsMenu-state"}
                            onClick={() => onItemsStateChange(true)}
                        >
                            <Done /> {doneButtonText || "done"}
                        </div>
                    </div>
                    {!done && createItem}
                    {children}
                </div>
                <div className="ItemsMenu-buttons">
                    <PagesMenu />
                    <SettingsButton />
                </div>
            </div>
        );
    }
}
