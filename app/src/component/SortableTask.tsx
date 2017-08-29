import * as React from "react";
import { SortableElement } from "react-sortable-hoc";

import { ITask } from "../lib/task";
import Task from "./Task";

class SortableTask extends React.Component<ITask> {
    public render() {
        return <Task {...this.props} />;
    }
}

export default SortableElement(SortableTask);
