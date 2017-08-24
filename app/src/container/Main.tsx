import * as React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { Redirect } from "react-router-dom";

import TaskLists from "../component/TaskLists";
import { isSignedIn } from "../lib/firebase";
import "./style/Main.css";

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
export default class extends React.Component {
    public render() {
        if (!isSignedIn()) {
            return <Redirect to="/sign-in" />;
        }

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
