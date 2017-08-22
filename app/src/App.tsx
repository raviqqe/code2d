import * as React from "react";

import "./App.css";
import TaskList from "./TaskList";

export default class extends React.Component {
    public render() {
        return (
            <div>
                <div className="App-header">
                    <h1>code2d</h1>
                </div>
                <div className="App-task-lists">
                    <TaskList />
                    <TaskList />
                    <TaskList />
                </div>
            </div>
        );
    }
}
