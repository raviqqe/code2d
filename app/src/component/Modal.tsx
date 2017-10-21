import * as React from "react";
import * as ReactDOM from "react-dom";
import Close = require("react-icons/lib/md/close");
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

import config from "../config";
import CircleButton from "./CircleButton";
import "./style/Modal.css";

interface IProps {
    button: (props: { opened: boolean, openWindow: () => void }) => JSX.Element;
    isSmallWindow: boolean;
    onOpen?: () => void;
    showCloseButton?: boolean;
}

interface IState {
    opened: boolean;
}

class Modal extends React.Component<IProps, IState> {
    public state: IState = { opened: false };
    private element: HTMLElement | null;

    public render() {
        const Button = this.props.button;
        const { opened } = this.state;

        return [
            (
                <Button
                    key="button"
                    opened={opened}
                    openWindow={() => this.setState({ opened: true })}
                />
            ),
            !!this.element && this.renderModalWindow(),
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

    private renderModalWindow = (): JSX.Element => {
        const { children, isSmallWindow, onOpen, showCloseButton } = this.props;
        const { opened } = this.state;
        const closeWindow = () => this.setState({ opened: false });

        return (ReactDOM as any).createPortal(
            <CSSTransition
                appear={true}
                classNames="Modal-container"
                in={opened}
                timeout={config.maxAnimationDelayMs}
                onEntered={onOpen}
                onExited={this.removeElement}
            >
                <div className="Modal-container" onClick={closeWindow}>
                    {(isSmallWindow || showCloseButton) &&
                        <div className="Modal-close-button-container">
                            <CircleButton onClick={closeWindow}>
                                <Close />
                            </CircleButton>
                        </div>}
                    <div className="Modal-window" onClick={(event) => event.stopPropagation()}>
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

export default connect(({ environment }) => environment)(Modal);
