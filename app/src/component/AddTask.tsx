import * as React from "react";
import { connect } from "react-redux";

import { INewTask } from "../lib/task";
import { actionCreators } from "../redux/add-task";

interface IProps {
    addTask: (task: INewTask) => void;
}

interface IState {
    addingTask: boolean;
    task: INewTask;
}

class AddTask extends React.Component<IProps, IState> {
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
                    this.props.addTask(this.state.task);
                    this.setState({
                        addingTask: false,
                        task: { name: "", description: "" },
                    });
                }}
            >
                <input
                    placeholder="Name"
                    type="text"
                    value={this.state.task.name}
                    onChange={({ target: { value } }) =>
                        this.setState({ task: { ...this.state.task, name: value } })}
                />
                <input
                    placeholder="Description"
                    type="text"
                    value={this.state.task.description}
                    onChange={({ target: { value } }) =>
                        this.setState({ task: { ...this.state.task, description: value } })}
                />
                <input type="submit" value="Add task" />
            </form>
        );
    }
}

export default connect(({ addTask }) => addTask, { addTask: actionCreators.addTask })(AddTask);
