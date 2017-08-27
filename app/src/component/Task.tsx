import * as React from "react";
import Close = require("react-icons/lib/fa/close");
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import "./style/Task.css";

interface IProps extends ITask {
    removeTask: (taskId: string) => void;
}

class Task extends React.Component<IProps> {
    public render() {
        const { description, id, name } = this.props;

        return (
            <div className="Task">
                <div>{"ID:" + id}</div>
                <div>{"Name:" + name}</div>
                <div>{"Description:" + description}</div>
                <div onClick={() => this.props.removeTask(id)}><Close /></div>
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
