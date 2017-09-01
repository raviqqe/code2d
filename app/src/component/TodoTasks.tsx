import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import { isTouchDevice } from "../lib/device";
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
        if (this.props.tasks.length === 0) {
            return <div>There is no todo task.</div>;
        }

        const sortableProps = isTouchDevice() ? { pressDelay: 200 } : { distance: 5 };

        return (
            <div className="TodoTasks-container">
                <SortableTasks
                    onSortEnd={({ newIndex, oldIndex }) =>
                        this.props.setTodoTasks(
                            arrayMove(this.props.tasks, oldIndex, newIndex))}
                    tasks={this.props.tasks}
                    {...sortableProps}
                />
            </div>
        );
    }
}

export default connect(
    ({ tasks: { todoTasks } }) => ({ tasks: todoTasks } as any), // TODO: Remove `as any`.
    actionCreators,
)(TodoTasks);
