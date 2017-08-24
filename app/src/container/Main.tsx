import * as React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import TaskLists from "../component/TaskLists";
import "./style/Main.css";

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
class Main extends React.Component<{ signedIn: boolean }> {
    public render() {
        if (!this.props.signedIn) {
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

export default connect(({ authState }) => authState, {})(Main);
