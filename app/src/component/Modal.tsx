import * as React from "react";
import * as ReactDOM from "react-dom";
import Close = require("react-icons/lib/md/close");

import config from "../config";
import Button from "./Button";
import "./style/Modal.css";

const animationDelayMs = 200;

interface IProps {
    button: (props: { opened: boolean, openWindow: () => void }) => JSX.Element;
    onOpen?: () => void;
    showCloseButton?: boolean;
}

interface IState {
    opened: boolean;
}

export default class extends React.Component<IProps, IState> {
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
            opened && this.renderModalWindow(),
        ];
    }

    public componentWillUpdate(_, { opened }: IState) {
        if (!this.state.opened && opened) {
            this.element = document.createElement("div");
            document.getElementById(config.rootId).appendChild(this.element);
        }
    }

    public componentDidUpdate(_, { opened }: IState) {
        const { onOpen } = this.props;

        if (!opened && this.state.opened && onOpen) {
            setTimeout(onOpen, animationDelayMs);
        } else if (opened && !this.state.opened) {
            this.element.remove();
            this.element = null;
        }
    }

    public componentWillUnmount() {
        if (this.element) {
            this.element.remove();
        }
    }

    private renderModalWindow = (): JSX.Element => {
        const { children, showCloseButton } = this.props;
        const closeWindow = () => this.setState({ opened: false });

        return (ReactDOM as any).createPortal(
            <div className="Modal-container" onClick={closeWindow}>
                {showCloseButton &&
                    <div className="Modal-close-button-container">
                        <Button className="Modal-close-button" onClick={closeWindow}>
                            <Close />
                        </Button>
                    </div>}
                <div
                    className="Modal-window"
                    onClick={(event) => event.stopPropagation()}
                >
                    {typeof children === "function" ? children(closeWindow) : children}
                </div>
            </div>,
            this.element);
    }
}
