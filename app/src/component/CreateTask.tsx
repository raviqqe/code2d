import * as React from "react";
import { Plus } from "react-feather";
import { connect } from "react-redux";

import { INewTask } from "../lib/task";
import { actionCreators } from "../redux/tasks";

interface IProps {
    createTask: (task: INewTask) => void;
}

interface IState {
    creatingTask: boolean;
    task: INewTask;
}

class CreateTask extends React.Component<IProps, IState> {
    public state: IState = {
        creatingTask: false,
        task: { name: "", description: "" },
    };

    private name: { focus: () => void };

    public componentDidUpdate(_, { creatingTask }: IState) {
        if (!creatingTask && this.state.creatingTask) {
            this.name.focus(); // Do this after rendering.
        }
    }

    public render() {
        if (!this.state.creatingTask) {
            return (
                <div onClick={() => this.setState({ creatingTask: true })}>
                    <Plus />
                </div>
            );
        }

        return (
            <form
                onSubmit={() => {
                    this.props.createTask(this.state.task);
                    this.setState({
                        creatingTask: false,
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
                <input type="submit" value="Create" />
                <button onClick={() => this.setState({ creatingTask: false })}>Cancel</button>
            </form>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(CreateTask);
