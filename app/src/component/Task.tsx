import * as React from "react";
import { Edit2, X } from "react-feather";
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import EditableText from "./EditableText";
import "./style/Task.css";

interface IProps extends ITask {
    editable?: boolean;
    editTask: (oldTask: ITask, newTask: ITask) => void;
    markDoneTask: (task: ITask) => void;
    removeTask: (task: ITask) => void;
}

class Task extends React.Component<IProps> {
    private description: { edit: () => void; };

    public render() {
        const { createdAt, description, name, updatedAt } = this.props;
        const task: ITask = { createdAt, description, name, updatedAt };

        const editable = this.props.editable || this.props.editable === undefined;

        return (
            <div className="Task">
                <EditableText
                    editable={editable}
                    text={name}
                    onEdit={(name) => this.props.editTask(task, { ...task, name })}
                />
                <EditableText
                    ref={(description) => { this.description = description; }}
                    editable={editable}
                    text={description}
                    onEdit={(description) => this.props.editTask(task, { ...task, description })}
                />
                <div
                    onClick={() => {
                        if (editable) {
                            this.props.markDoneTask(task);
                        } else {
                            this.props.removeTask(task);
                        }
                    }}
                >
                    <X />
                </div>
                {editable && (
                    <div onClick={() => this.description.edit()}>
                        <Edit2 />
                    </div>
                )}
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
