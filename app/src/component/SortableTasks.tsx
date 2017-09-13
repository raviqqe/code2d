import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { ITask } from "../lib/tasks";
import Task from "./Task";

class SortableTasks extends React.Component<{ tasks: ITask[] }> {
    public render() {
        const { tasks } = this.props;
        const SortableTask = SortableElement(Task);

        return (
            <div>
                {tasks.map((task, index) =>
                    <SortableTask key={`task-${index}`} index={index} {...task} />)}
            </div>
        );
    }
}

export default SortableContainer(SortableTasks);
