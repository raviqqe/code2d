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
        // TODO: Fix editable prop hack.

        return (
            <ul className="DoneTasks-container">
                {this.props.tasks.map((task: ITask, index) =>
                    <li key={index}><Task {...{ editable: false, ...task }} /></li>)}
            </ul>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(DoneTasks);
