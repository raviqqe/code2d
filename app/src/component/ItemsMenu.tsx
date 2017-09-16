import * as React from "react";
import Done = require("react-icons/lib/md/check-box");
import Todo = require("react-icons/lib/md/check-box-outline-blank");
import { connect } from "react-redux";

import "./style/ItemsMenu.css";

interface IProps {
    done: boolean;
    toggleItemsState: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, done, toggleItemsState } = this.props;

        return (
            <div className="ItemsMenu-container">
                <div className="ItemsMenu-buttons">
                    <div
                        className={done ? "ItemsMenu-button" : "ItemsMenu-button-highlighted"}
                        onClick={() => done && toggleItemsState()}
                    >
                        <Todo /> todo
                    </div>
                    <div
                        className={done ? "ItemsMenu-button-highlighted" : "ItemsMenu-button"}
                        onClick={() => !done && toggleItemsState()}
                    >
                        <Done /> done
                    </div>
                </div>
                {children}
            </div>
        );
    }
}
