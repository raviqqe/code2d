import * as _ from "lodash";
import * as React from "react";
import Check = require("react-icons/lib/fa/check");
import Copy = require("react-icons/lib/fa/copy");
import Repeat = require("react-icons/lib/fa/repeat");

import "./style/TaskLists.css";
import TaskList from "./TaskList";

export default class extends React.Component {
    public state = {
        tasks: [
            [{ id: "foo-1" }, { id: "bar-1" }, { id: "baz-1" }],
            [{ id: "foo-2" }, { id: "bar-2" }, { id: "baz-2" }],
            [{ id: "foo-3" }, { id: "bar-3" }, { id: "baz-3" }],
        ],
    };

    public render() {
        const swapTasks = (task, swappedTask) => {
            const [i, j] = findIndices(this.state.tasks, { id: task.id });
            const [k, l] = findIndices(this.state.tasks, { id: swappedTask.id });

            const tasks = [
                [...this.state.tasks[0]],
                [...this.state.tasks[1]],
                [...this.state.tasks[2]],
            ];

            tasks[i][j] = swappedTask;
            tasks[k][l] = task;

            this.setState({ tasks });
        };

        const { tasks } = this.state;

        return (
            <div className="TaskLists">
                <TaskList tasks={tasks[0]} onDrop={swapTasks} icon={<Copy />} />
                <TaskList tasks={tasks[1]} onDrop={swapTasks} icon={<Repeat />} />
                <TaskList tasks={tasks[2]} onDrop={swapTasks} icon={<Check />} />
            </div>
        );
    }
}

function findIndices(objs: any[][], obj: any): number[] {
    const js = objs.map((objs) => _.findIndex(objs, obj));
    const i = _.findIndex(js, (j) => j >= 0);
    return [i, js[i]];
}
