import * as _ from "lodash";
import numeral = require("numeral");
import * as React from "react";
import { Check, Clock, RotateCcw, Trash2 } from "react-feather";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ITask } from "../lib/tasks";
import { actionCreators as tasksActionCreators } from "../redux/tasks";
import { actionCreators as timerActionCreators } from "../redux/timer";
import "./style/Task.css";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";

interface IProps extends ITask {
    currentTask: ITask | null;
    detailed: boolean;
    done?: boolean;
    updateCurrentTask: (task: ITask) => void;
    switchTaskState: (task: ITask) => void;
    removeTask: (task: ITask) => void;
    setCurrentTask: (task: ITask | null) => void;
    toggleTimer: () => void;
}

interface IState {
    showButtons: boolean;
}

class Task extends React.Component<IProps, IState> {
    public state: IState = { showButtons: false };

    public render() {
        const {
            createdAt, detailed, setCurrentTask, spentSeconds, updatedAt, updateCurrentTask,
        } = this.props;

        const editable = detailed;
        const task = this.task;

        return (
            <div
                className={!detailed && this.isCurrentTask
                    ? "Task-container-highlighted"
                    : "Task-container"}
                onClick={() => setCurrentTask(task)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Task-header">
                    <TaskName
                        editable={editable}
                        text={task.name}
                        onEdit={(name) => updateCurrentTask({ ...task, name })}
                    />
                    {this.buttons}
                </div>
                {detailed && [
                    <TaskDescription
                        key="description"
                        editable={editable}
                        text={task.description}
                        onEdit={(description) => updateCurrentTask({ ...task, description })}
                    />,
                    this.renderSpentSeconds(),
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
                <div
                    key="markTodo"
                    className="Task-button"
                    onClick={() => this.props.switchTaskState(task)}
                >
                    <RotateCcw size={20} />
                </div>,
            );
        } else {
            buttons.push(
                <div
                    key="markDone"
                    className="Task-button"
                    onClick={() => this.props.switchTaskState(task)}
                >
                    <Check size={22} />
                </div>,
                (
                    <div
                        key="turnOnTimer"
                        className="Task-button"
                        onClick={() => {
                            this.props.setCurrentTask(task);
                            this.props.toggleTimer();
                        }}
                    >
                        <Clock size={22} />
                    </div>
                ));
        }

        if (this.props.detailed) {
            buttons.push(
                <div
                    key="trash"
                    className="Task-button"
                    onClick={() => this.props.removeTask(task)}
                >
                    <Trash2 size={22} />
                </div>,
            );
        }

        return (
            <div className="Task-buttons-container" style={this.buttonsStyle}>
                {buttons}
            </div>
        );
    }

    private get buttonsStyle() {
        if (this.state.showButtons) {
            return {};
        } else if (this.props.detailed) {
            return { display: "none" };
        }

        return { visibility: "hidden" };
    }

    private get isCurrentTask(): boolean {
        return _.isEqual(this.task, this.props.currentTask);
    }

    private get task(): ITask {
        const { createdAt, description, name, spentSeconds, updatedAt } = this.props;
        return { createdAt, description, name, spentSeconds, updatedAt };
    }

    private renderSpentSeconds = () => {
        const minutes: number = this.props.spentSeconds / 60;
        const time: string = minutes < 60
            ? `${numeral(minutes).format("0")} mins`
            : `${numeral(minutes / 60).format("0[.]0")} hours`;

        return (
            <div key="spentTime" className="Task-spent-time">
                Spent for: {time}
            </div>
        );
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
    { ...tasksActionCreators, ...timerActionCreators },
)(Task);
