import * as React from "react";
import Check = require("react-icons/lib/fa/check");

import "./style/TaskList.css";
import Task from "./Task";

interface IProps {
    icon: any;
    tasks: any[];
    onDrop: (task: any, swappedTask: any) => void;
}

export default class extends React.Component<IProps> {
    public render() {
        return (
            <div className="TaskList">
                <div className="TaskList-header">
                    {this.props.icon}
                </div>
                {this.props.tasks.map((task) =>
                    <Task {...task} key={task.id} onDrop={this.props.onDrop} />)}
            </div>
        );
    }
}
