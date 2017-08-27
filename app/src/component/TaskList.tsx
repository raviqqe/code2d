import * as React from "react";
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import AddTask from "./AddTask";
import SortableTasks from "./SortableTasks";
import "./style/TaskList.css";

function reorderTask(tasks, i, j) {
    tasks = [...tasks];
    tasks.splice(j, 0, tasks.splice(i, 1)[0]);
    return tasks;
}

class TaskList extends React.Component<{ tasks: ITask[] }> {
    public render() {
        return (
            <div className="TaskList-container">
                <AddTask />
                <SortableTasks
                    onSortEnd={() => {
                        // TODO: Sort tasks.
                    }}
                    tasks={this.props.tasks}
                />
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks)(TaskList);
