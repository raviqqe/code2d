import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import CreateTask from "../component/CreateTask";
import Menu from "../component/Menu";
import Task from "../component/Task";
import TaskList from "../component/TaskList";
import * as notification from "../lib/notification";
import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/Tasks.css";
import Timer from "./Timer";

interface IProps {
    creatingTask: boolean;
    currentTask: ITask | null;
    signedIn: boolean;
    tasks: ITask[];
    done: boolean;
    timerOn: boolean;
}

class Tasks extends React.Component<IProps> {
    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
        } else if (this.props.timerOn) {
            return <Timer />;
        }

        const { creatingTask, currentTask, done } = this.props;

        return (
            <div className="Tasks-container">
                <div className="Tasks-menu-blank" />
                <div className="Tasks-menu">
                    <Menu />
                </div>
                <div className="Tasks-main">
                    <div className="Tasks-tasks">
                        <TaskList />
                    </div>
                    <div className="Tasks-sidebar">
                        {!creatingTask && currentTask &&
                            <Task
                                {...{
                                    detailed: true,
                                    done,
                                    ...currentTask,
                                }}
                            />}
                        {!done && <CreateTask />}
                    </div>
                </div>
                <div className="Tasks-blank" />
            </div>
        );
    }

    public componentDidMount() {
        notification.requestPermission();
    }
}

export default connect(
    ({ authState, tasks, timer }) => ({ ...authState, ...tasks, timerOn: timer.on }),
    actionCreators,
)(Tasks);
