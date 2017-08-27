import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import AddTask from "./AddTask";
import SortableTasks from "./SortableTasks";
import "./style/TaskList.css";

function reorderTask(tasks, i, j) {
    tasks = [...tasks];
    tasks.splice(j, 0, tasks.splice(i, 1)[0]);
    return tasks;
}

interface IProps {
    tasks: ITask[];
    setTaskList: (taskIds: string[]) => void;
}

class TaskList extends React.Component<IProps> {
    public render() {
        return (
            <div className="TaskList-container">
                <AddTask />
                <SortableTasks
                    onSortEnd={({ newIndex, oldIndex }) => this.props.setTaskList(arrayMove(
                        this.props.tasks.map(({ id }) => id),
                        oldIndex,
                        newIndex))}
                    tasks={this.props.tasks}
                />
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TaskList);
