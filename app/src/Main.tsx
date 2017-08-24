import * as React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";

import "./Main.css";
import TaskLists from "./TaskLists";

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
export default class extends React.Component {
    public render() {
        return (
            <div>
                <div className="Main-header">
                    <h1>code2d</h1>
                </div>
                <TaskLists />
            </div>
        );
    }
}
