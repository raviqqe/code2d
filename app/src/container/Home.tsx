import * as React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import TaskList from "../component/TaskList";
import "./style/Home.css";

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
class Home extends React.Component<{ signedIn: boolean }> {
    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
        }

        return (
            <div>
                <TaskList />
            </div>
        );
    }
}

export default connect(({ authState }) => authState, {})(Home);
