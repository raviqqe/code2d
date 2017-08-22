import * as React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";

import "./App.css";
import TaskList from "./TaskList";

@DragDropContext(TouchBackend)
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
