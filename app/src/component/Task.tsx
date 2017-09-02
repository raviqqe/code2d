import * as _ from "lodash";
import * as React from "react";
import { Check, RotateCcw, Trash2 } from "react-feather";
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

class Task extends React.Component<IProps> {
    public render() {
        const { createdAt, detailed, setCurrentTask, setTask, updatedAt } = this.props;
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
                {detailed && [
                    <TaskDescription
                        key="description"
                        editable={editable}
                        text={task.description}
                        onEdit={(description) => setTask(task, { ...task, description })}
                    />,
                    this.renderDate("Created at", createdAt),
                    this.renderDate("Updated at", updatedAt),
                ]}
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

    private renderDate = (label: string, timestamp: number) => {
        return (
            <div key={label} className="Task-date">
                {label}: {(new Date(timestamp).toLocaleDateString())}
            </div>
        );
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
