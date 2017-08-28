import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import CreateTask from "./CreateTask";
import SortableTasks from "./SortableTasks";
import "./style/TodoTasks.css";

interface IProps {
    tasks: ITask[];
    setTodoTasks: (tasks: ITask[]) => void;
}

class TodoTasks extends React.Component<IProps> {
    public render() {
        return (
            <div className="TodoTasks-container">
                <CreateTask />
                <SortableTasks
                    onSortEnd={({ newIndex, oldIndex }) =>
                        this.props.setTodoTasks(arrayMove(this.props.tasks, oldIndex, newIndex))}
                    distance={5}
                    tasks={this.props.tasks}
                />
            </div>
        );
    }
}

export default connect(
    ({ tasks: { undoneTasks } }) => ({ tasks: undoneTasks } as any), // TODO: Remove `as any`.
    actionCreators,
)(TodoTasks);
