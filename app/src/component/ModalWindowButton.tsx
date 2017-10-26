import * as React from "react";
import * as ReactDOM from "react-dom";
import Close = require("react-icons/lib/md/close");
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import config from "../config";
import CircleButton from "./CircleButton";
import "./style/ModalWindowButton.css";

interface IProps {
    buttonComponent: (props: { opened: boolean, openWindow: () => void }) => JSX.Element;
    buttonProps?: object;
    isSmallWindow: boolean;
    onOpen?: () => void;
    showCloseButton?: boolean;
}

interface IState {
    opened: boolean;
}

class ModalWindowButton extends React.Component<IProps, IState> {
    public state: IState = { opened: false };
    private element: HTMLElement | null;

    public render() {
        const { buttonComponent, buttonProps } = this.props;
        const Button = buttonComponent;
        const { opened } = this.state;

        return [
            (
                <Button
                    key="button"
                    opened={opened}
                    openWindow={() => this.setState({ opened: true })}
                    {...{ ...(buttonProps || {}) }}
                />
            ),
            !!this.element && this.renderModalWindowButtonWindow(),
        ];
    }

    public componentWillUpdate(_, { opened }: IState) {
        if (!this.state.opened && opened) {
            this.createElement();
        }
    }

    public componentWillUnmount() {
        this.removeElement();
    }

    private renderModalWindowButtonWindow = (): JSX.Element => {
        const { children, isSmallWindow, onOpen, showCloseButton } = this.props;
        const { opened } = this.state;
        const closeWindow = () => this.setState({ opened: false });

        return (ReactDOM as any).createPortal(
            <CSSTransition
                appear={true}
                classNames="ModalWindowButton-container"
                in={opened}
                timeout={config.maxAnimationDelayMs}
                onEntered={onOpen}
                onExited={this.removeElement}
            >
                <div className="ModalWindowButton-container" onClick={closeWindow}>
                    {(isSmallWindow || showCloseButton) &&
                        <div className="ModalWindowButton-close-button-container">
                            <CircleButton onClick={closeWindow}>
                                <Close />
                            </CircleButton>
                        </div>}
                    <div className="ModalWindowButton-window" onClick={(event) => event.stopPropagation()}>
                        {typeof children === "function" ? children(closeWindow) : children}
                    </div>
                </div>
            </CSSTransition>,
            this.element);
    }

    private createElement = (): void => {
        if (!this.element) {
            this.element = document.createElement("div");
            document.getElementById(config.rootId).appendChild(this.element);
        }
    }

    private removeElement = (): void => {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}

export default connect(({ environment }) => environment)(ModalWindowButton);
