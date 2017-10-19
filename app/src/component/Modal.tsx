import * as React from "react";
import Close = require("react-icons/lib/md/close");

import Button from "./Button";
import "./style/Modal.css";

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

    public render() {
        const { button, children, showCloseButton } = this.props;
        const ShowButton = button;
        const { opened } = this.state;
        const closeWindow = () => this.setState({ opened: false });

        return (
            <div>
                <ShowButton opened={opened} openWindow={() => this.setState({ opened: true })} />
                <div
                    className={"Modal-container" + (opened ? "" : "-hidden")}
                    onClick={closeWindow}
                >
                    {showCloseButton &&
                        <div className="Modal-close-button-container">
                            <Button
                                className="Modal-close-button"
                                onClick={closeWindow}
                            >
                                <Close />
                            </Button>
                        </div>}
                    <div
                        className="Modal-window"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {typeof children === "function" ? children(closeWindow) : children}
                    </div>
                </div>
            </div>
        );
    }

    public componentDidUpdate(_, { opened }: IState) {
        const { onOpen } = this.props;

        if (onOpen && !opened && this.state.opened) {
            setTimeout(onOpen, 200); // Run after animation.
        }
    }
}
