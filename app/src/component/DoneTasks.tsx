import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import "./style/DoneTasks.css";
import Task from "./Task";

interface IProps {
    tasks: ITask[];
}

class DoneTasks extends React.Component<IProps> {
    public render() {
        if (this.props.tasks.length === 0) {
            return <div>There is no done task.</div>;
        }

        return (
            <div className="DoneTasks-tasks-container">
                {this.props.tasks.map((task: ITask, index) =>
                    <Task key={index} {...{ done: true, ...task }} />)}
            </div>
        );
    }
}

export default connect(
    ({ tasks: { doneTasks } }) => ({ tasks: doneTasks } as any),
    actionCreators,
)(DoneTasks);
