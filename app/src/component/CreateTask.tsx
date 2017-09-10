import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { INewTask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/CreateTask.css";

interface IProps {
    createTask: () => void;
    creatingTask: boolean;
    newTask: INewTask;
    setNewTask: (task: INewTask) => void;
    startCreatingTask: () => void;
    stopCreatingTask: () => void;
}

class CreateTask extends React.Component<IProps> {
    private name: { focus: () => void };

    public componentDidUpdate({ creatingTask }) {
        if (!creatingTask && this.props.creatingTask) {
            this.name.focus(); // Do this after rendering.
        }
    }

    public render() {
        if (!this.props.creatingTask) {
            return (
                <div className="CreateTask-plus-button-container">
                    <button
                        className="CreateTask-plus-button"
                        onClick={this.props.startCreatingTask}
                    >
                        <Plus />
                    </button>
                </div>
            );
        }

        const { newTask, setNewTask } = this.props;

        return (
            <form
                className="CreateTask-form-container"
                onSubmit={(event) => {
                    this.props.createTask();
                    event.preventDefault();
                }}
            >
                <input
                    ref={(name) => { this.name = name; }}
                    placeholder="Name"
                    value={newTask.name}
                    onChange={({ target: { value } }) =>
                        setNewTask({ ...newTask, name: value })}
                />
                <textarea
                    className="CreateTask-description"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={({ target: { value } }) =>
                        setNewTask({ ...newTask, description: value })}
                />
                <div className="CreateTask-buttons">
                    <button className="CreateTask-button" type="submit">Create</button>
                    <button
                        className="CreateTask-cancel-button"
                        onClick={this.props.stopCreatingTask}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(CreateTask);
