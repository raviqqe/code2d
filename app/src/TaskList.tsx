import * as React from "react";

import Task from "./Task";
import "./TaskList.css";

export default class extends React.Component {
    public render() {
        return (
            <div className="TaskList">
                <Task />
                <Task />
                <Task />
            </div>
        );
    }
}
