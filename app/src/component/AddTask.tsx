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

    private name: { focus: () => void };

    public componentDidUpdate(_, { addingTask }: IState) {
        if (!addingTask && this.state.addingTask) {
            this.name.focus(); // Do this after rendering.
        }
    }

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
                    ref={(name) => { this.name = name; }}
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
                <button onClick={() => this.setState({ addingTask: false })}>Cancel</button>
            </form>
        );
    }
}

export default connect(({ addTask }) => addTask, { addTask: actionCreators.addTask })(AddTask);
