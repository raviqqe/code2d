import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { bindActionCreators } from "redux";

import { isTouchDevice } from "../lib/device";
import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import SortableTasks from "./SortableTasks";
import "./style/TaskList.css";

interface IProps {
    done: boolean;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
}

class TaskList extends React.Component<IProps> {
    public render() {
        const { done, tasks, setTasks } = this.props;

        if (tasks.length === 0) {
            return <div>There is no task.</div>;
        }

        const sortableProps = isTouchDevice() ? { pressDelay: 200 } : { distance: 5 };

        return (
            <div className="TaskList-container">
                <SortableTasks
                    done={done}
                    onSortEnd={({ newIndex, oldIndex }) =>
                        setTasks(arrayMove([...tasks], oldIndex, newIndex))}
                    tasks={tasks}
                    {...sortableProps}
                />
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TaskList);
