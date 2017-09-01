import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import CreateTask from "../component/CreateTask";
import Menu from "../component/Menu";
import Task from "../component/Task";
import TaskList from "../component/TaskList";
import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/Tasks.css";

interface IProps {
    creatingTask: boolean;
    currentTask: ITask | null;
    setCurrentTask: (task: ITask | null) => void;
    signedIn: boolean;
    tasks: ITask[];
    done: boolean;
}

class Tasks extends React.Component<IProps> {
    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
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
                        <TaskList {...{ done }} />
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
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const { currentTask, tasks } = this.props;

        if (!currentTask || _.findIndex(tasks, currentTask) < 0) {
            this.props.setCurrentTask(tasks[0] || null);
        }
    }
}

export default connect(
    ({ authState, tasks: { creatingTask, currentTask, doneTasks, todoTasks } }, { done }) => ({
        ...authState,
        creatingTask,
        currentTask,
        tasks: done ? doneTasks : todoTasks,
    }),
    actionCreators,
)(Tasks);
