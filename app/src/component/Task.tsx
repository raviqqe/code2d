import * as React from "react";
import Close = require("react-icons/lib/fa/close");
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import EditableText from "./EditableText";
import "./style/Task.css";

interface IProps extends ITask {
    editTask: (oldTask: ITask, newTask: ITask) => void;
    markDoneTask: (task: ITask) => void;
}

class Task extends React.Component<IProps> {
    public render() {
        const { createdAt, description, name, updatedAt } = this.props;
        const task: ITask = { createdAt, description, name, updatedAt };

        return (
            <div className="Task">
                <EditableText
                    text={name}
                    onEdit={(name) => this.props.editTask(task, { ...task, name })}
                />
                <EditableText
                    text={description}
                    onEdit={(description) => this.props.editTask(task, { ...task, description })}
                />
                <div onClick={() => this.props.markDoneTask(task)}>
                    <Close />
                </div>
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
