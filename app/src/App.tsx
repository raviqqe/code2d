import * as React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import Check = require("react-icons/lib/fa/check");
import Copy = require("react-icons/lib/fa/copy");
import Repeat = require("react-icons/lib/fa/repeat");

import "./App.css";
import TaskLists from "./TaskLists";

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
export default class extends React.Component {
    public render() {
        return (
            <div>
                <div className="App-header">
                    <h1>code2d</h1>
                </div>
                <TaskLists />
            </div>
        );
    }
}
