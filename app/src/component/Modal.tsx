import * as React from "react";

import ScrollBar from "./ScrollBar";
import "./style/Modal.css";

interface IProps {
    button: (props: { shown: boolean, showWindow: () => void }) => JSX.Element;
}

interface IState {
    shown: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { shown: false };

    public render() {
        const { button, children } = this.props;
        const Button = button;
        const { shown } = this.state;

        return (
            <div>
                <Button shown={shown} showWindow={() => this.setState({ shown: true })} />
                <div
                    className={"Modal-container" + (shown ? "" : "-hidden")}
                    onClick={() => this.setState({ shown: false })}
                >
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
