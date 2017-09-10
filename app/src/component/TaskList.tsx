import * as _ from "lodash";
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
    currentTag: string | null;
    done: boolean;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
}

class TaskList extends React.Component<IProps> {
    public render() {
        const { currentTag, done, setTasks } = this.props;
        const tasks = _.filter(
            this.props.tasks,
            ({ tags }) => currentTag === null || tags.includes(currentTag));

        if (tasks.length === 0) {
            return <div>There is no task.</div>;
        }

        return (
            <div className="TaskList-container">
                <SortableTasks
                    done={done}
                    onSortEnd={({ newIndex, oldIndex }) =>
                        currentTag === null && setTasks(arrayMove([...tasks], oldIndex, newIndex))}
                    tasks={tasks}
                    {...this.sortableProps}
                />
            </div>
        );
    }

    private get sortableProps(): { distance?: number, pressDelay?: number } {
        if (this.props.currentTag === null) {
            return isTouchDevice() ? { pressDelay: 200 } : { distance: 5 };
        }

        return { distance: 2 ** 32 };
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TaskList);
