import * as React from "react";
import { Check, Edit2, RotateCcw, X } from "react-feather";
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import EditableText from "./EditableText";
import "./style/Task.css";

interface IProps extends ITask {
    done?: boolean;
    editTask: (oldTask: ITask, newTask: ITask) => void;
    markTaskDone: (task: ITask) => void;
    markTaskUndone: (task: ITask) => void;
    removeTask: (task: ITask) => void;
}

class Task extends React.Component<IProps> {
    private description: { edit: () => void; };

    public render() {
        const { createdAt, description, done, name, updatedAt } = this.props;
        const task: ITask = { createdAt, description, name, updatedAt };

        return (
            <div className="Task">
                <EditableText
                    editable={!done}
                    text={name}
                    onEdit={(name) => this.props.editTask(task, { ...task, name })}
                />
                <EditableText
                    ref={(description) => { this.description = description; }}
                    editable={!done}
                    text={description}
                    onEdit={(description) => this.props.editTask(task, { ...task, description })}
                />
                {done ? (
                    <div>
                        <div onClick={() => this.props.removeTask(task)}><X /></div>
                        <div onClick={() => this.props.markTaskUndone(task)}><RotateCcw /></div>
                    </div >
                ) : (
                        <div>
                            <div onClick={() => this.props.markTaskDone(task)}><Check /></div>
                            <div onClick={() => this.description.edit()}><Edit2 /></div>
                        </div>
                    )}
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
