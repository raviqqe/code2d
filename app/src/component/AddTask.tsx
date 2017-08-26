import * as React from "react";

import { INewTask } from "../lib/task";

function reorderTask(tasks, i, j) {
    tasks = [...tasks];
    tasks.splice(j, 0, tasks.splice(i, 1)[0]);
    return tasks;
}

interface IState {
    addingTask: boolean;
    task: INewTask;
}

export default class extends React.Component<{}, IState> {
    public state: IState = {
        addingTask: false,
        task: { name: "", description: "" },
    };

    public render() {
        if (!this.state.addingTask) {
            return (
                <div onClick={() => this.setState({ addingTask: true })}>
                    Add a task
                </div>
            );
        }

        return (
            <form
                onSubmit={() => {
                    // TODO: this.props.addTask(this.state.task);
                    this.setState({
                        addingTask: false,
                        task: { name: "", description: "" },
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
