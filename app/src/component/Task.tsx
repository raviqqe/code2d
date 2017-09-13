import * as _ from "lodash";
import numeral = require("numeral");
import * as React from "react";
import Clock = require("react-icons/lib/md/access-time");
import Check = require("react-icons/lib/md/check");
import Trash = require("react-icons/lib/md/delete");
import Repeat = require("react-icons/lib/md/replay");
import { connect } from "react-redux";

import { ITask } from "../lib/tasks";
import { actionCreators as tasksActionCreators } from "../redux/tasks";
import { actionCreators as timerActionCreators } from "../redux/timer";
import "./style/Task.css";
import TaskDescription from "./TaskDescription";
import TaskName from "./TaskName";
import TaskTags from "./TaskTags";

interface IProps extends ITask {
    currentItem: ITask | null;
    detailed: boolean;
    done: boolean;
    updateCurrentItem: (task: ITask) => void;
    toggleItemState: (task: ITask) => void;
    removeItem: (task: ITask) => void;
    setCurrentItem: (task: ITask | null) => void;
    toggleTimer: () => void;
}

interface IState {
    showButtons: boolean;
}

class Task extends React.Component<IProps, IState> {
    public state: IState = { showButtons: false };

    public render() {
        const {
            createdAt, description, detailed, name, setCurrentItem,
            spentSeconds, tags, updatedAt, updateCurrentItem,
        } = this.props;

        const editable = detailed;

        return (
            <div
                className={!detailed && this.isCurrentItem
                    ? "Task-container-highlighted"
                    : "Task-container"}
                onClick={detailed ? undefined : () => setCurrentItem(this.task)}
                onMouseOver={() => this.setState({ showButtons: true })}
                onMouseOut={() => this.setState({ showButtons: false })}
            >
                <div className="Task-header">
                    <TaskName
                        editable={editable}
                        text={name}
                        onEdit={(name) => updateCurrentItem({ ...this.task, name })}
                    />
                    {this.buttons}
                </div>
                {detailed && [
                    <TaskTags key="tags" tags={tags} />,
                    <TaskDescription
                        key="description"
                        editable={editable}
                        text={description}
                        onEdit={(description) =>
                            updateCurrentItem({ ...this.task, description })}
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
                        this.props.toggleItemState(this.task);
                        event.stopPropagation();
                    }}
                >
                    <Repeat />
                </div>,
            );
        } else {
            buttons.push(
                <div
                    key="markDone"
                    className="Task-button"
                    onClick={(event) => {
                        this.props.toggleItemState(this.task);
                        event.stopPropagation();
                    }}
                >
                    <Check />
                </div>,
                (
                    <div
                        key="turnOnTimer"
                        className="Task-button"
                        onClick={(event) => {
                            this.props.setCurrentItem(this.task);
                            this.props.toggleTimer();
                            event.stopPropagation();
                        }}
                    >
                        <Clock />
                    </div>
                ));
        }

        if (this.props.detailed) {
            buttons.push(
                <div
                    key="trash"
                    className="Task-button"
                    onClick={(event) => {
                        this.props.removeItem(this.task);
                        event.stopPropagation();
                    }}
                >
                    <Trash />
                </div>,
            );
        }

        return (
            <div className="Task-buttons" style={this.buttonsStyle}>
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

    private get isCurrentItem(): boolean {
        return _.isEqual(this.task, this.props.currentItem);
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
