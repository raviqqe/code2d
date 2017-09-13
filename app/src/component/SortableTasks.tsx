import * as React from "react";
import { SortableContainer } from "react-sortable-hoc";

import { ITask } from "../lib/tasks";
import SortableTask from "./SortableTask";

class SortableTasks extends React.Component<{ tasks: ITask[] }> {
    public render() {
        const { tasks } = this.props;

        return (
            <div>
                {tasks.map((task, index) =>
                    <SortableTask key={`task-${index}`} index={index} {...task} />)}
            </div>
        );
    }
}

export default SortableContainer(SortableTasks);
