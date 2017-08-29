import * as React from "react";
import { Check, Edit2, RotateCcw, Trash2 } from "react-feather";
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import EditableText from "./EditableText";
import "./style/Task.css";

interface IProps extends ITask {
    done?: boolean;
    editTask: (oldTask: ITask, newTask: ITask) => void;
    markTaskDone: (task: ITask) => void;
    markTaskTodo: (task: ITask) => void;
    removeTask: (task: ITask) => void;
}

class Task extends React.Component<IProps> {
    private description: { edit: () => void; };

    public render() {
        const editable = !this.props.done;
        const task = this.task;

        return (
            <div className="Task-container">
                <div className="Task-header">
                    <EditableText
                        className="Task-name"
                        inputClassName="Task-name-input"
                        editable={editable}
                        text={task.name}
                        onEdit={(name) => this.props.editTask(task, { ...task, name })}
                    />
                    {this.buttons}
                </div>
                <EditableText
                    className="Task-description"
                    inputClassName="Task-description-input"
                    ref={(description) => { this.description = description; }}
                    editable={editable}
                    text={task.description}
                    onEdit={(description) => this.props.editTask(task, { ...task, description })}
                />
            </div>
        );
    }

    private get buttons() {
        const task = this.task;

        return this.props.done ? (
            <div className="Task-buttons-container">
                <div className="Task-button" onClick={() => this.props.markTaskTodo(task)}>
                    <RotateCcw size={20} />
                </div>
                <div className="Task-button" onClick={() => this.props.removeTask(task)}>
                    <Trash2 size={22} />
                </div>
            </div>
        ) : (
                <div className="Task-buttons-container">
                    <div className="Task-button" onClick={() => this.props.markTaskDone(task)}>
                        <Check size={22} />
                    </div>
                    <div className="Task-button" onClick={() => this.description.edit()}>
                        <Edit2 size={20} />
                    </div>
                </div>
            );
    }

    private get task(): ITask {
        const { createdAt, description, name, updatedAt } = this.props;
        return { createdAt, description, name, updatedAt };
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
