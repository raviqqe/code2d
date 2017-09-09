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
import TaskTags from "./TaskTags";

interface IProps extends ITask {
    currentTask: ITask | null;
    detailed: boolean;
    done?: boolean;
    updateCurrentTask: (task: ITask) => void;
    toggleTaskState: (task: ITask) => void;
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
            createdAt, description, detailed, name, setCurrentTask,
            spentSeconds, tags, updatedAt, updateCurrentTask,
        } = this.props;

        const editable = detailed;

        return (
            <div
                className={!detailed && this.isCurrentTask
                    ? "Task-container-highlighted"
                    : "Task-container"}
                onClick={() => setCurrentTask(this.task)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Task-header">
                    <TaskName
                        editable={editable}
                        text={name}
                        onEdit={(name) => updateCurrentTask({ ...this.task, name })}
                    />
                    {this.buttons}
                </div>
                {detailed && [
                    <TaskTags key="tags" {...{ tags }} />,
                    <TaskDescription
                        key="description"
                        editable={editable}
                        text={description}
                        onEdit={(description) =>
                            updateCurrentTask({ ...this.task, description })}
                    />,
                    this.renderSpentSeconds(),
                    this.renderDate("Created at", createdAt),
                    this.renderDate("Updated at", updatedAt),
                ]}
            </div>
        );
    }

    private get buttons() {
        const buttons = [];

        if (this.props.done) {
            buttons.push(
                <div
                    key="markTodo"
                    className="Task-button"
                    onClick={(event) => {
                        this.props.toggleTaskState(this.task);
                        event.stopPropagation();
                    }}
                >
                    <RotateCcw size={20} />
                </div>,
            );
        } else {
            buttons.push(
                <div
                    key="markDone"
                    className="Task-button"
                    onClick={(event) => {
                        this.props.toggleTaskState(this.task);
                        event.stopPropagation();
                    }}
                >
                    <Check size={22} />
                </div>,
                (
                    <div
                        key="turnOnTimer"
                        className="Task-button"
                        onClick={(event) => {
                            this.props.setCurrentTask(this.task);
                            this.props.toggleTimer();
                            event.stopPropagation();
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
                    onClick={(event) => {
                        this.props.removeTask(this.task);
                        event.stopPropagation();
                    }}
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
        const { createdAt, description, name, spentSeconds, tags, updatedAt } = this.props;
        return { createdAt, description, name, spentSeconds, tags, updatedAt };
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
