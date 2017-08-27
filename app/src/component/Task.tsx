import * as React from "react";
import Close = require("react-icons/lib/fa/close");

import { ITask } from "../lib/task";
import "./style/Task.css";

export default class extends React.Component<ITask> {
    public render() {
        const { description, id, name } = this.props;

        return (
            <div className="Task">
                <div>{"ID:" + id}</div>
                <div>{"Name:" + name}</div>
                <div>{"Description:" + description}</div>
                <div
                    onClick={() => {
                        // TODO: Delete a task.
                    }}
                >
                    <Close />
                </div>
            </div>
        );
    }
}
