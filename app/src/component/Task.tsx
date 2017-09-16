import numeral = require("numeral");
import * as React from "react";
import Clock = require("react-icons/lib/md/access-time");
import { connect } from "react-redux";

import { ITask } from "../lib/tasks";
import { actionCreators as tasksActionCreators } from "../redux/tasks";
import { actionCreators as timerActionCreators } from "../redux/timer";
import Item from "./Item";
import "./style/Task.css";
import TaskDescription from "./TaskDescription";
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

class Task extends React.Component<IProps> {
    public render() {
        const {
            createdAt, description, setCurrentItem,
            spentSeconds, tags, updatedAt, updateCurrentItem,
        } = this.props;

        return (
            <Item
                {...this.props}
                buttons={[
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
                    </div>,
                ]}
                details={[
                    <TaskTags key="tags" tags={tags} />,
                    <TaskDescription
                        key="description"
                        text={description}
                        onEdit={(description) => updateCurrentItem({ ...this.task, description })}
                    />,
                    this.renderSpentSeconds(),
                    this.renderDate("Created at", createdAt),
                    this.renderDate("Updated at", updatedAt),
                ]}
                item={this.task}
                onEditName={(name) => updateCurrentItem({ ...this.task, name })}
            />
        );
    }

    private get task(): ITask {
        const { createdAt, description, id, name, spentSeconds, tags, updatedAt } = this.props;
        return { createdAt, description, id, name, spentSeconds, tags, updatedAt };
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
