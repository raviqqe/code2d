import * as React from "react";
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
                <div
                    className={done ? "ItemsMenu-button" : "ItemsMenu-button-highlighted"}
                    onClick={() => done && toggleItemsState()}
                >
                    todo
                </div>
                <div
                    className={done ? "ItemsMenu-button-highlighted" : "ItemsMenu-button"}
                    onClick={() => !done && toggleItemsState()}
                >
                    done
                </div>
                {children}
            </div>
        );
    }
}
