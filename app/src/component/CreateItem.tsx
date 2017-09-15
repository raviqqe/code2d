import * as React from "react";
import Plus = require("react-icons/lib/md/add");

import "./style/CreateItem.css";

interface IProps {
    createItem: () => void;
    onChangeState?: (creatingItem: boolean) => void;
}

interface IState {
    creatingItem: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { creatingItem: false };

    public componentWillUpdate({ onChangeState }: IProps, { creatingItem }: IState) {
        if (onChangeState) {
            onChangeState(creatingItem);
        }
    }

    public render() {
        const { children, createItem } = this.props;

        if (this.state.creatingItem) {
            return (
                <form
                    className="CreateItem-form-container"
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
