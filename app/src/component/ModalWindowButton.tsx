import * as React from "react";
import Close = require("react-icons/lib/md/close");
import { connect } from "react-redux";

import CircleButton from "./CircleButton";
import ModalButton, { IButtonProps, IContentProps } from "./ModalButton";
import "./style/ModalWindowButton.css";

interface IProps {
    buttonComponent: (props: IButtonProps) => JSX.Element;
    buttonProps?: object;
    isSmallWindow: boolean;
    onOpen?: () => void;
    showCloseButton?: boolean;
}

class ModalWindowButton extends React.Component<IProps> {
    public render() {
        const { buttonComponent, buttonProps, onOpen } = this.props;

        return (
            <ModalButton
                buttonComponent={buttonComponent}
                buttonProps={buttonProps}
                contentComponent={this.contentComponent}
                onOpen={onOpen}
                transitionClassNames="ModalWindowButton-container"
            />
        );
    }

    private contentComponent = ({ closeWindow, opened }: IContentProps): JSX.Element => {
        const { children, isSmallWindow, onOpen, showCloseButton } = this.props;

        return (
            <div className="ModalWindowButton-container" onClick={closeWindow}>
                {(isSmallWindow || showCloseButton) &&
                    <div className="ModalWindowButton-close-button-container">
                        <CircleButton onClick={closeWindow}>
                            <Close />
                        </CircleButton>
                    </div>}
                <div
                    className="ModalWindowButton-window"
                    onClick={(event) => event.stopPropagation()}
                >
                    {typeof children === "function" ? children(closeWindow) : children}
                </div>
            </div>
        );
    }
}

export default connect(({ environment }) => environment)(ModalWindowButton);
