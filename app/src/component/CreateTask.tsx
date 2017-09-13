import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { INewTask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/CreateTask.css";

interface IProps {
    createItem: () => void;
    creatingItem: boolean;
    newItem: INewTask;
    setNewItem: (task: INewTask) => void;
    startCreatingItem: () => void;
    stopCreatingItem: () => void;
}

class CreateTask extends React.Component<IProps> {
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

        const { newItem, setNewItem } = this.props;

        return (
            <form
                className="CreateTask-form-container"
                onSubmit={(event) => {
                    this.props.createItem();
                    event.preventDefault();
                }}
            >
                <input
                    ref={(name) => { this.name = name; }}
                    placeholder="Name"
                    value={newItem.name}
                    onChange={({ target: { value } }) =>
                        setNewItem({ ...newItem, name: value })}
                />
                <textarea
                    className="CreateTask-description"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={({ target: { value } }) =>
                        setNewItem({ ...newItem, description: value })}
                />
                <div className="CreateTask-buttons">
                    <button className="CreateTask-button" type="submit">Create</button>
                    <button
                        className="CreateTask-cancel-button"
                        onClick={this.props.stopCreatingItem}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(CreateTask);
