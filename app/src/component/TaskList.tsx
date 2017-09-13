import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { bindActionCreators } from "redux";

import { isTouchDevice } from "../lib/device";
import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import SortableItems from "./SortableItems";
import "./style/TaskList.css";
import Task from "./Task";

interface IProps {
    currentTag: string | null;
    currentTask: ITask | null;
    done: boolean;
    tasks: ITask[];
    setCurrentTask: (task: ITask) => void;
    setTasks: (tasks: ITask[]) => void;
}

class TaskList extends React.Component<IProps> {
    public render() {
        const { currentTag, done, setTasks } = this.props;
        const tasks = this.tasks;

        if (tasks.length === 0) {
            return <div>There is no task.</div>;
        }

        return (
            <div className="TaskList-container">
                <SortableItems
                    component={Task}
                    items={tasks}
                    onSortEnd={({ newIndex, oldIndex }) =>
                        setTasks(arrayMove([...tasks], oldIndex, newIndex))}
                    {...this.sortableProps}
                />
            </div>
        );
    }

    public componentDidUpdate() {
        const { currentTask, setCurrentTask } = this.props;
        const tasks = this.tasks;

        if (tasks.length !== 0 && (currentTask === null || !_.find(tasks, currentTask))) {
            setCurrentTask(tasks[0] || null);
        }
    }

    private get sortableProps(): { distance?: number, pressDelay?: number } {
        if (this.props.currentTag === null) {
            return isTouchDevice() ? { pressDelay: 200 } : { distance: 5 };
        }

        return { distance: 2 ** 32 }; // Disable sorting.
    }

    private get tasks(): ITask[] {
        const { currentTag, tasks } = this.props;

        return currentTag === null
            ? tasks
            : _.filter(tasks, ({ tags }) => tags.includes(currentTag));
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TaskList);
