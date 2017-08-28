import * as React from "react";
import Close = require("react-icons/lib/fa/close");
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import "./style/Task.css";

interface IProps extends ITask {
    markDoneTask: (task: ITask) => void;
}

class Task extends React.Component<IProps> {
    public state = {
        description: "",
        editingDescription: false,
        editingName: false,
        name: "",
    };

    public render() {
        const { name, description, createdAt, updatedAt } = this.props;
        const { editingName, editingDescription } = this.state;

        return (
            <div className="Task">
                {editingName ? (
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={({ target: { value } }) =>
                            this.setState({ name: value })}
                        onKeyPress={({ charCode }) => {
                            if (charCode === 13) {
                                this.setState({ editingName: false });
                            }
                        }}
                    />
                ) : (
                        <div onClick={() => this.setState({ editingName: true, name })}>
                            {name}
                        </div>
                    )}
                {editingDescription ? (
                    <input
                        type="text"
                        value={this.state.description}
                        onChange={({ target: { value } }) =>
                            this.setState({ description: value })}
                        onKeyPress={({ charCode }) => {
                            if (charCode === 13) {
                                this.setState({ editingDescription: false });
                            }
                        }}
                    />
                ) : (
                        <div onClick={() => this.setState({ editingDescription: true, description })}>
                            {description}
                        </div>
                    )}
                <div
                    onClick={() => this.props.markDoneTask({
                        createdAt,
                        description,
                        name,
                        updatedAt,
                    })}
                >
                    <Close />
                </div>
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
