import * as React from "react";
import { SortableContainer } from "react-sortable-hoc";

import { ITask } from "../lib/task";
import SortableTask from "./SortableTask";

class SortableTasks extends React.Component<{ tasks: ITask[] }> {
    public render() {
        return (
            <ul>
                {this.props.tasks.map((task, index) =>
                    <SortableTask key={`task-${index}`} index={index} {...task} />)}
            </ul>
        );
    }
}

export default SortableContainer(SortableTasks);
