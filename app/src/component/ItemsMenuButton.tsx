import * as React from "react";
import Menu = require("react-icons/lib/md/menu");

import CircleButton from "./CircleButton";
import "./style/ItemsMenuButton.css";

interface IProps {
    itemsMenu: JSX.Element;
}

interface IState {
    shown: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { shown: false };

    public render() {
        const { itemsMenu } = this.props;
        const { shown } = this.state;
        const postfix = shown ? "-shown" : "";

        return (
            <div className="ItemsMenuButton-container">
                <CircleButton
                    className="ItemsMenuButton-icon"
                    onClick={() => this.setState({ shown: !shown })}
                >
                    <Menu />
                </CircleButton>
                <div
                    className={"ItemsMenuButton-menu-background" + postfix}
                    onClick={() => this.setState({ shown: false })}
                />
                <div className={"ItemsMenuButton-menu-container" + postfix}>
                    {itemsMenu}
                </div>
            </div>);
    }
}
