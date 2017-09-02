import * as _ from "lodash";
import * as React from "react";
import { Check, Edit2, RotateCcw, Save, Trash2 } from "react-feather";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/Task.css";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

interface IProps extends ITask {
    currentTask: ITask | null;
    detailed: boolean;
    done?: boolean;
    setTask: (oldTask: ITask, newTask: ITask) => void;
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
        const { detailed, setCurrentTask, setTask } = this.props;
        const editable = detailed;
        const task = this.task;

        return (
            <div
                className={!detailed && this.isCurrentTask
                    ? "Task-container-highlighted"
                    : "Task-container"}
                onClick={() => setCurrentTask(task)}
            >
                <div className="Task-header">
                    <TaskName
                        editable={editable}
                        text={task.name}
                        onEdit={(name) => setTask(task, { ...task, name })}
                    />
                    {this.buttons}
                </div>
                {detailed && (
                    <TaskDescription
                        editing={editable && this.state.editingDescription}
                        text={task.description}
                        onBlur={() => this.setState({ editingDescription: false })}
                        onClick={() => this.setState({ editingDescription: true })}
                        onKeyDown={({ keyCode, shiftKey }) => {
                            if (keyCode === 13 && shiftKey) {
                                this.setState({ editingDescription: false });
                                event.preventDefault();
                            }
                        }}
                        onEdit={(description) => setTask(task, { ...task, description })}
                    />
                )}
            </div>
        );
    }

    private get buttons() {
        const task = this.task;
        const buttons = [];

        if (this.props.done) {
            buttons.push(
                <div className="Task-button" onClick={() => this.props.switchTaskState(task)}>
                    <RotateCcw size={20} />
                </div>,
            );
        } else {
            buttons.push(
                <div className="Task-button" onClick={() => this.props.switchTaskState(task)}>
                    <Check size={22} />
                </div>,
            );
        }

        if (this.props.detailed) {
            if (this.state.editingDescription) {
                buttons.push(
                    <div
                        className="Task-button"
                        onClick={() => this.setState({ editingDescription: false })}
                    >
                        <Save size={20} />
                    </div>,
                );
            } else {
                buttons.push(
                    <div
                        className="Task-button"
                        onClick={() => this.setState({ editingDescription: true })}
                    >
                        <Edit2 size={20} />
                    </div>,
                );
            }

            buttons.push(
                <div className="Task-button" onClick={() => this.props.removeTask(task)}>
                    <Trash2 size={22} />
                </div>,
            );
        }

        return (
            <div className="Task-buttons-container">{buttons}</div>
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

export default connect(
    ({ tasks }) => tasks,
    (dispatch, { done }) => {
        const {
            removeDoneTask, removeTodoTask,
            setCurrentTask,
            setDoneTask, setTodoTask,
            switchTaskState,
        } = bindActionCreators(actionCreators, dispatch);

        return {
            removeTask: done ? removeDoneTask : removeTodoTask,
            setCurrentTask,
            setTask: done ? setDoneTask : setTodoTask,
            switchTaskState,
        };
    },
)(Task);
