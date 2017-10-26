import * as React from "react";
import Menu = require("react-icons/lib/md/menu");

import CircleButton from "./CircleButton";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";
import "./style/ItemsMenuButton.css";

interface IProps {
    itemsMenu: JSX.Element;
}

export default class extends React.Component<IProps> {
    public render() {
        const { itemsMenu } = this.props;

        return (
            <ModalButton
                buttonComponent={this.buttonComponent}
                contentComponent={this.contentComponent}
                transitionClassNames="ItemsMenuButton-menu-container"
            />
        );
    }

    private buttonComponent = ({ openWindow }: IButtonProps): JSX.Element => (
        <div className="ItemsMenuButton-button-container">
            <CircleButton
                className="ItemsMenuButton-button"
                onClick={openWindow}
            >
                <Menu />
            </CircleButton>
        </div>
    )

    private contentComponent = ({ closeWindow }: IContentProps): JSX.Element => (
        <div className="ItemsMenuButton-menu-container" onClick={closeWindow} >
            {this.props.itemsMenu}
        </div>
    )
}
