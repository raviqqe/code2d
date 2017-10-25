import * as React from "react";
import Menu = require("react-icons/lib/md/menu");

import CircleButton from "./CircleButton";
import "./style/ItemsMenuButton.css";

interface IProps {
    itemsMenu: JSX.Element;
}

interface IState {
    opened: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { opened: false };

    public render() {
        const { itemsMenu } = this.props;
        const { opened } = this.state;
        const postfix = opened ? "-opened" : "";

        return (
            <div className="ItemsMenuButton-container">
                <CircleButton
                    className="ItemsMenuButton-button"
                    onClick={() => this.setState({ opened: !opened })}
                >
                    <Menu />
                </CircleButton>
                <div
                    className={"ItemsMenuButton-menu-background" + postfix}
                    onClick={() => this.setState({ opened: false })}
                />
                <div className={"ItemsMenuButton-menu-container" + postfix}>
                    {itemsMenu}
                </div>
            </div>
        );
    }
}
