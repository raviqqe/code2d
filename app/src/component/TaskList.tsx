import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import AddTask from "./AddTask";
import SortableTasks from "./SortableTasks";
import "./style/TaskList.css";

interface IProps {
    tasks: ITask[];
    setUndoneTasks: (tasks: ITask[]) => void;
}

class TaskList extends React.Component<IProps> {
    public render() {
        return (
            <div className="TaskList-container">
                <AddTask />
                <SortableTasks
                    onSortEnd={({ newIndex, oldIndex }) =>
                        this.props.setUndoneTasks(arrayMove(this.props.tasks, oldIndex, newIndex))}
                    distance={5}
                    tasks={this.props.tasks}
                />
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TaskList);
