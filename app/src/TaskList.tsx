import * as _ from "lodash";
import * as React from "react";

import Task from "./Task";
import "./TaskList.css";

export default class extends React.Component {
    public state = {
        tasks: [{ id: "foo" }, { id: "bar" }, { id: "baz" }],
    };

    public render() {
        const swapTasks = (task, swappedTask) => {
            const tasks = [...this.state.tasks];

            tasks[_.findIndex(this.state.tasks, { id: task.id })] = swappedTask;
            tasks[_.findIndex(this.state.tasks, { id: swappedTask.id })] = task;

            this.setState({ tasks });
        };

        return (
            <div className="TaskList">
                {this.state.tasks.map((task) =>
                    <Task {...task} key={task.id} onDrop={swapTasks} />)}
            </div>
        );
    }
}
