import * as React from "react";
import { Check, Edit2, RotateCcw, Save, Trash2 } from "react-feather";
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import "./style/Task.css";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

interface IProps extends ITask {
    done?: boolean;
    editTask: (oldTask: ITask, newTask: ITask) => void;
    markTaskDone: (task: ITask) => void;
    markTaskTodo: (task: ITask) => void;
    removeTask: (task: ITask) => void;
    sorting: boolean;
}

interface IState {
    editingDescription: boolean;
    showAll: boolean;
}

class Task extends React.Component<IProps, IState> {
    public state: IState = { editingDescription: false, showAll: false };

    public render() {
        const editable = !this.props.done;
        const task = this.task;

        return (
            <div
                className="Task-container"
                onMouseDown={() => {
                    // Rerender a dragged task Before sorting.
                    this.setState({ showAll: false });
                }}
                onMouseOver={() => this.setState({ showAll: true })}
                onMouseOut={() => this.setState({ showAll: false })}
            >
                <div className="Task-header">
                    <TaskName
                        className="Task-name"
                        inputClassName="Task-name-input"
                        editable={editable}
                        text={task.name}
                        onEdit={(name) => this.props.editTask(task, { ...task, name })}
                    />
                    {this.buttons}
                </div>
                <TaskDescription
                    className={this.showAll ? "Task-description" : "invisible"}
                    inputClassName="Task-description-input"
                    editing={editable && this.state.editingDescription}
                    text={task.description}
                    onEdit={(description) => this.props.editTask(task, { ...task, description })}
                />
            </div>
        );
    }

    private get buttons() {
        const task = this.task;
        const containerProps = {
            className: this.showAll ? "Task-buttons-container" : "invisible",
            onMouseDown: (event) => event.stopPropagation(),
        };

        return this.props.done ? (
            <div {...containerProps}>
                <div className="Task-button" onClick={() => this.props.markTaskTodo(task)}>
                    <RotateCcw size={20} />
                </div>
                <div className="Task-button" onClick={() => this.props.removeTask(task)}>
                    <Trash2 size={22} />
                </div>
            </div>
        ) : (
                <div {...containerProps}>
                    <div className="Task-button" onClick={() => this.props.markTaskDone(task)}>
                        <Check size={22} />
                    </div>
                    {this.state.editingDescription ? (
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
                        )}
                </div>
            );
    }

    private get showAll(): boolean {
        return this.state.showAll && !this.props.sorting;
    }

    private get task(): ITask {
        const { createdAt, description, name, updatedAt } = this.props;
        return { createdAt, description, name, updatedAt };
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
