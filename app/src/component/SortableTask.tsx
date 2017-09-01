import * as React from "react";
import { SortableElement } from "react-sortable-hoc";

import { ITask } from "../lib/tasks";
import Task from "./Task";

interface IProps extends ITask {
    done: boolean;
}

class SortableTask extends React.Component<IProps> {
    public render() {
        return <Task {...this.props} />;
    }
}

export default SortableElement(SortableTask);
