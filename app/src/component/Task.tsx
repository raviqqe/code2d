import * as React from "react";
import Close = require("react-icons/lib/fa/close");

import ITask from "../lib/task";
import "./style/Task.css";

interface IProps extends ITask {
    onDelete: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { description, id, name, onDelete } = this.props;
        console.log(onDelete);

        return (
            <div className="Task">
                <div>{"ID:" + id}</div>
                <div>{"Name:" + name}</div>
                <div>{"Description:" + description}</div>
                <button onClick={onDelete}><Close /></button>
            </div>
        );
    }
}
