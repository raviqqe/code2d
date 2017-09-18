import * as React from "react";
import Plus = require("react-icons/lib/md/add");

import "./style/CreateItem.css";

interface IProps {
    createItem: () => void;
}

interface IState {
    creatingItem: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { creatingItem: false };

    public render() {
        const { children, createItem } = this.props;

        if (this.state.creatingItem) {
            return (
                <div
                    className="CreateItem-form-container"
                    onClick={() => this.setState({ creatingItem: false })}
                >
                    <form
                        className="CreateItem-form"
                        onClick={(event) => event.stopPropagation()}
                        onSubmit={(event) => {
                            createItem();
                            this.setState({ creatingItem: false });
                            event.preventDefault();
                        }}
                        onReset={(event) => {
                            this.setState({ creatingItem: false });
                            event.preventDefault();
                        }}
                    >
                        {children}
                    </form>
                </div>
            );
        }

        return (
            <div className="CreateItem-plus-button-container">
                <button
                    className="CreateItem-plus-button"
                    onClick={() => this.setState({ creatingItem: true })}
                >
                    <Plus />
                </button>
            </div>
        );
    }
}
