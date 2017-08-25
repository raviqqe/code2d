import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid = require("uuid/v4");

import ITask from "../lib/task";
import "./style/TaskList.css";
import Task from "./Task";

function reorderTask(tasks, i, j) {
    tasks = [...tasks];
    tasks.splice(j, 0, tasks.splice(i, 1)[0]);
    return tasks;
}

interface IProps {
    onAddTask: (task: ITask) => void;
}

interface IState {
    addingTask: boolean;
    task: ITask;
}

export default class extends React.Component<IProps, IState> {
    public state = {
        addingTask: false,
        task: { id: "", name: "", description: "" },
    };

    public render() {
        if (!this.state.addingTask) {
            return (
                <div
                    onClick={() => this.setState({
                        addingTask: true,
                        task: { id: uuid(), name: "", description: "" },
                    })}
                >
                    Add a task
                </div>
            );
        }

        return (
            <form
                onSubmit={() => {
                    this.props.onAddTask(this.state.task);
                    this.setState({
                        addingTask: false,
                        task: { id: "", name: "", description: "" },
                    });
                }}
            >
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.task.name}
                        onChange={({ target: { value } }) =>
                            this.setState({ task: { ...this.state.task, name: value } })}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={this.state.task.description}
                        onChange={({ target: { value } }) =>
                            this.setState({ task: { ...this.state.task, description: value } })}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
