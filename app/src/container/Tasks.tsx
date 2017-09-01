import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import CreateTask from "../component/CreateTask";
import DoneTasks from "../component/DoneTasks";
import Menu from "../component/Menu";
import Task from "../component/Task";
import TodoTasks from "../component/TodoTasks";
import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import "./style/Tasks.css";

interface IProps {
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

        const { currentTask, done } = this.props;
        const Tasks = done ? DoneTasks : TodoTasks;

        return (
            <div className="Tasks-container">
                <div className="Tasks-menu-blank" />
                <div className="Tasks-menu">
                    <Menu />
                </div>
                <div className="Tasks-main">
                    <div className="Tasks-tasks">
                        <Tasks />
                    </div>
                    <div className="Tasks-sidebar">
                        <div className="Tasks-current-task">
                            {currentTask &&
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
    ({ authState, tasks: { currentTask, doneTasks, todoTasks } }, { done }) => ({
        ...authState,
        currentTask,
        tasks: done ? doneTasks : todoTasks,
    }),
    actionCreators,
)(Tasks);
