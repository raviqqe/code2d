import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { INewTask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/CreateTask.css";

interface IProps {
    createItem: (task: INewTask) => void;
    creatingItem: boolean;
    startCreatingItem: () => void;
    stopCreatingItem: () => void;
}

interface IState {
    description: string;
    name: string;
}

class CreateTask extends React.Component<IProps, IState> {
    public state: IState = { description: "", name: "" };

    private name: { focus: () => void };

    public componentDidUpdate({ creatingItem }) {
        if (!creatingItem && this.props.creatingItem) {
            this.name.focus(); // Do this after rendering.
        }
    }

    public render() {
        if (!this.props.creatingItem) {
            return (
                <div className="CreateTask-plus-button-container">
                    <button
                        className="CreateTask-plus-button"
                        onClick={this.props.startCreatingItem}
                    >
                        <Plus />
                    </button>
                </div>
            );
        }

        const { description, name } = this.state;

        return (
            <form
                className="CreateTask-form-container"
                onSubmit={(event) => {
                    this.props.createItem({ description, name, tags: [] });
                    this.setState({ description: "", name: "" });
                    event.preventDefault();
                }}
                onReset={(event) => {
                    this.props.stopCreatingItem();
                    this.setState({ description: "", name: "" });
                    event.preventDefault();
                }}
            >
                <input
                    ref={(name) => this.name = name}
                    placeholder="Name"
                    value={name}
                    onChange={({ target: { value } }) => this.setState({ name: value })}
                />
                <textarea
                    className="CreateTask-description"
                    placeholder="Description"
                    value={description}
                    onChange={({ target: { value } }) => this.setState({ description: value })}
                />
                <div className="CreateTask-buttons">
                    <button className="CreateTask-button" type="submit">Create</button>
                    <button className="CreateTask-cancel-button" type="reset">Cancel</button>
                </div>
            </form>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(CreateTask);
