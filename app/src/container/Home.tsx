import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import DoneTasks from "../component/DoneTasks";
import Task from "../component/Task";
import TodoTasks from "../component/TodoTasks";
import { ITask } from "../lib/task";
import "./style/Home.css";

interface IProps {
    signedIn: boolean;
    doneTasks: ITask[];
    todoTasks: ITask[];
}

interface IState {
    showDoneTasks: boolean;
}

class Home extends React.Component<IProps, IState> {
    public state: IState = { showDoneTasks: false };

    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
        }

        const { showDoneTasks } = this.state;
        const Tasks = showDoneTasks ? DoneTasks : TodoTasks;
        const task = showDoneTasks ? this.props.doneTasks[0] : this.props.todoTasks[0];

        return (
            <div className="Home-container">
                <button onClick={() => this.setState({ showDoneTasks: !showDoneTasks })}>
                    {showDoneTasks ? "done" : "todo"}
                </button>
                <div className="Home-main">
                    <div className="Home-tasks">
                        <Tasks />
                    </div>
                    <div className="Home-sidebar">
                        {task && <Task {...task} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ authState, tasks }) => ({ ...authState, ...tasks }), {})(Home);
