import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import DoneTasks from "../component/DoneTasks";
import TodoTasks from "../component/TodoTasks";
import "./style/Home.css";

class Home extends React.Component<{ signedIn: boolean }> {
    public state = { showDoneTasks: false };

    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
        }

        const { showDoneTasks } = this.state;

        return (
            <div>
                <div onClick={() => this.setState({ showDoneTasks: !showDoneTasks })}>
                    {showDoneTasks ? "Done" : "To-do"} tasks
                </div>
                {showDoneTasks ? <DoneTasks /> : <TodoTasks />}
            </div>
        );
    }
}

export default connect(({ authState }) => authState, {})(Home);
