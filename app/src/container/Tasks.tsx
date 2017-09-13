import * as React from "react";
import { connect } from "react-redux";

import CreateTask from "../component/CreateTask";
import Menu from "../component/Menu";
import Task from "../component/Task";
import TaskList from "../component/TaskList";
import * as notification from "../lib/notification";
import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import Page from "./Page";
import "./style/Tasks.css";
import Timer from "./Timer";

interface IProps {
    creatingTask: boolean;
    currentTask: ITask | null;
    tasks: ITask[];
    done: boolean;
    timerOn: boolean;
}

class Tasks extends React.Component<IProps> {
    public render() {
        if (this.props.timerOn) {
            return <Timer />;
        }

        const { creatingTask, currentTask, done } = this.props;

        return (
            <Page {...{ menu: <Menu /> }}>
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
            </Page>
        );
    }

    public componentDidMount() {
        notification.requestPermission();
    }
}

export default connect(
    ({ tasks, timer }) => ({ ...tasks, timerOn: timer.on }),
    actionCreators,
)(Tasks);
