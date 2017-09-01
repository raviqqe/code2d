import * as React from "react";
import { SortableContainer } from "react-sortable-hoc";

import { ITask } from "../lib/tasks";
import SortableTask from "./SortableTask";

class SortableTasks extends React.Component<{ done: boolean, tasks: ITask[] }> {
    public render() {
        const { done, tasks } = this.props;

        return (
            <div>
                {tasks.map((task, index) =>
                    <SortableTask key={`task-${index}`} index={index} done={done} {...task} />)}
            </div>
        );
    }
}

export default SortableContainer(SortableTasks);
