import * as React from "react";
import Close = require("react-icons/lib/fa/close");
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import { actionCreators } from "../redux/tasks";
import EditableText from "./EditableText";
import "./style/Task.css";

interface IProps extends ITask {
    markDoneTask: (task: ITask) => void;
}

class Task extends React.Component<IProps> {
    public render() {
        const { name, description, createdAt, updatedAt } = this.props;

        return (
            <div className="Task">
                <EditableText text={name} onEdit={() => undefined} />
                <EditableText text={description} onEdit={() => undefined} />
                <div
                    onClick={() => this.props.markDoneTask({
                        createdAt,
                        description,
                        name,
                        updatedAt,
                    })}
                >
                    <Close />
                </div>
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Task);
