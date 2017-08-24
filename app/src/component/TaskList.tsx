import * as React from "react";
import Check = require("react-icons/lib/fa/check");

import Task from "./Task";
import "./TaskList.css";

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
