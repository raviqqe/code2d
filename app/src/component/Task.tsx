import * as React from "react";

import ITask from "../lib/task";
import "./style/Task.css";

export default class extends React.Component<ITask> {
    public render() {
        const { description, id, name } = this.props;

        return (
            <div className="Task">
                <div>{"ID:" + id}</div>
                <div>{"Name:" + name}</div>
                <div>{"Description:" + description}</div>
            </div>
        );
    }
}
