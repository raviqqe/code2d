import * as _ from "lodash";
import * as React from "react";
import { Plus } from "react-feather";
import { connect } from "react-redux";

import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/TaskTags.css";
import TaskTag from "./TaskTag";

interface IProps {
    currentTask: ITask;
    tags: string[];
    updateCurrentTask: (task: ITask) => void;
}

interface IState {
    newTag: string;
    taggingTask: boolean;
}

class TaskTags extends React.Component<IProps, IState> {
    public state: IState = { newTag: "", taggingTask: false };

    private input: { focus: () => void, value: string };

    public render() {
        const { currentTask, tags, updateCurrentTask } = this.props;
        const { newTag, taggingTask } = this.state;

        return (
            <div className="TaskTags-container">
                <div className="TaskTags-tags">
                    {tags.map((tag, index) =>
                        <TaskTag
                            key={index}
                            tag={tag}
                            onClick={() => {
                                updateCurrentTask({
                                    ...currentTask,
                                    tags: _.filter(tags, (x) => x !== tag),
                                });
                            }}
                        />)}
                    <button
                        style={taggingTask ? { display: "none" } : {}}
                        className="TaskTags-button"
                        onClick={() => this.setState({ taggingTask: true })}
                    >
                        <div className="TaskTags-icon">
                            <Plus size={16} />
                        </div>
                    </button>
                </div>
                <input
                    ref={(input) => { this.input = input; }}
                    style={taggingTask ? {} : { display: "none" }}
                    className="TaskTags-input"
                    placeholder="tag name"
                    onBlur={() => this.setState({ taggingTask: false })}
                    onChange={({ target: { value } }) => this.setState({ newTag: value })}
                    onKeyDown={(event: React.KeyboardEvent<{}>) => {
                        const tag = newTag.trim();

                        if (event.keyCode === 13 && tag !== "" && !tags.includes(tag)) {
                            updateCurrentTask({
                                ...currentTask,
                                tags: [...tags, tag].sort(),
                            });
                        }

                        if (event.keyCode === 13) {
                            this.setState({ taggingTask: false, newTag: "" });
                            event.preventDefault();
                        }
                    }}
                    value={newTag}
                />
            </div >
        );
    }

    public componentDidUpdate(_, { taggingTask }: IState) {
        if (!taggingTask && this.state.taggingTask) {
            this.input.focus();
        }
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TaskTags);
