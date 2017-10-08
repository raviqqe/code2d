import * as React from "react";
import Close = require("react-icons/lib/md/close");

import Button from "./Button";
import ScrollBar from "./ScrollBar";
import "./style/Modal.css";

interface IProps {
    button: (props: { shown: boolean, showWindow: () => void }) => JSX.Element;
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

        return (
            <div>
                <ShowButton shown={shown} showWindow={() => this.setState({ shown: true })} />
                <div
                    className={"Modal-container" + (shown ? "" : "-hidden")}
                    onClick={() => this.setState({ shown: false })}
                >
                    {showCloseButton &&
                        <div className="Modal-close-button-container">
                            <Button
                                className="Modal-close-button"
                                onClick={() => this.setState({ shown: false })}
                            >
                                <Close />
                            </Button>
                        </div>}
                    <ScrollBar>
                        <div className="Modal-window-container">
                            <div
                                className="Modal-window"
                                onClick={(event) => event.stopPropagation()}
                            >
                                {children}
                            </div>
                        </div>
                    </ScrollBar>
                </div>
            </div>
        );
    }
}
