import * as _ from "lodash";
import * as React from "react";
import { Check, Edit2, RotateCcw, Save, Trash2 } from "react-feather";
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import "./style/Task.css";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

interface IProps extends ITask {
    currentTask: ITask | null;
    detailed: boolean;
    done?: boolean;
    editTask: (oldTask: ITask, newTask: ITask) => void;
    switchTaskState: (task: ITask) => void;
    removeTask: (task: ITask) => void;
    setCurrentTask: (task: ITask | null) => void;
}

interface IState {
    editingDescription: boolean;
}

class Task extends React.Component<IProps, IState> {
    public state: IState = { editingDescription: false };

    public render() {
        const editable = !this.props.done;
        const task = this.task;

        return (
            <div
                className={!this.props.detailed && this.isCurrentTask
                    ? "Task-container-highlighted"
                    : "Task-container"}
                onClick={() => this.props.setCurrentTask(task)}
            >
                <div className="Task-header">
                    <TaskName
                        editable={editable}
                        text={task.name}
                        onEdit={(name) => this.props.editTask(task, { ...task, name })}
                    />
                    {this.buttons}
                </div>
                {this.props.detailed && (
                    <TaskDescription
                        editing={editable && this.state.editingDescription}
                        text={task.description}
                        onBlur={() => this.setState({ editingDescription: false })}
                        onClick={() => this.setState({ editingDescription: true })}
                        onEdit={(description) =>
                            this.props.editTask(task, { ...task, description })}
                    />
                )}
            </div>
        );
    }

    private get buttons() {
        const task = this.task;
        const containerProps = {
            className: "Task-buttons-container",
        };

        if (this.props.done) {
            return (
                <div {...containerProps}>
                    <div className="Task-button" onClick={() => this.props.switchTaskState(task)}>
                        <RotateCcw size={20} />
                    </div>
                    <div className="Task-button" onClick={() => this.props.removeTask(task)}>
                        <Trash2 size={22} />
                    </div>
                </div>
            );
        }

        return (
            <div {...containerProps}>
                <div className="Task-button" onClick={() => this.props.switchTaskState(task)}>
                    <Check size={22} />
                </div>
                {this.props.detailed && (this.state.editingDescription ? (
                    <div
                        className="Task-button"
                        onClick={() => this.setState({ editingDescription: false })}
                    >
                        <Save size={20} />
                    </div>
                ) : (
                        <div
                            className="Task-button"
                            onClick={() => this.setState({ editingDescription: true })}
                        >
                            <Edit2 size={20} />
                        </div>
                    ))}
            </div>
        );
    }

    private get isCurrentTask(): boolean {
        return _.isEqual(this.task, this.props.currentTask);
    }

    private get task(): ITask {
        const { createdAt, description, name, updatedAt } = this.props;
        return { createdAt, description, name, updatedAt };
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
