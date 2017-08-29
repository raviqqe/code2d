import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import DoneTasks from "../component/DoneTasks";
import TodoTasks from "../component/TodoTasks";
import "./style/Home.css";

interface IState {
    showDoneTasks: boolean;
}

class Home extends React.Component<{ signedIn: boolean }, IState> {
    public state: IState = { showDoneTasks: false };

    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
        }

        const { showDoneTasks } = this.state;

        return (
            <div>
                <div onClick={() => this.setState({ showDoneTasks: !showDoneTasks })}>
                    {showDoneTasks ? "done" : "todo"}
                </div>
                {showDoneTasks ? <DoneTasks /> : <TodoTasks />}
            </div>
        );
    }
}

export default connect(({ authState }) => authState, {})(Home);
