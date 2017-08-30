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
    startSortingTasks: () => void;
    stopSortingTasks: () => void;
}

class TodoTasks extends React.Component<IProps> {
    public render() {
        return (
            <div className="TodoTasks-container">
                <div className="TodoTasks-create-task">
                    <CreateTask />
                </div>
                <div className="TodoTasks-tasks-container">
                    <SortableTasks
                        onSortStart={this.props.startSortingTasks}
                        onSortEnd={({ newIndex, oldIndex }) => {
                            this.props.setTodoTasks(
                                arrayMove(this.props.tasks, oldIndex, newIndex));
                            this.props.stopSortingTasks();
                        }}
                        tasks={this.props.tasks}
                        pressDelay={isTouchDevice()
                            ? 200
                            : /* Wait rerendering of a dragged task */ 80}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    ({ tasks: { todoTasks } }) => ({ tasks: todoTasks } as any), // TODO: Remove `as any`.
    actionCreators,
)(TodoTasks);
