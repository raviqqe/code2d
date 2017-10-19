import * as React from "react";
import Close = require("react-icons/lib/md/close");

import Button from "./Button";
import "./style/Modal.css";

interface IProps {
    button: (props: { shown: boolean, showWindow: () => void }) => JSX.Element;
    onOpen?: () => void;
    showCloseButton?: boolean;
}

interface IState {
    shown: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { shown: false };

    public render() {
        const { button, children, showCloseButton } = this.props;
        const ShowButton = button;
        const { shown } = this.state;
        const closeWindow = () => this.setState({ shown: false });

        return (
            <div>
                <ShowButton shown={shown} showWindow={() => this.setState({ shown: true })} />
                <div
                    className={"Modal-container" + (shown ? "" : "-hidden")}
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

    public componentDidUpdate(_, { shown }: IState) {
        const { onOpen } = this.props;

        if (onOpen && !shown && this.state.shown) {
            setTimeout(onOpen); // Run after animation.
        }
    }
}
