import * as _ from "lodash";
import * as React from "react";
import AutoComplete = require("react-autocomplete");
import { Plus } from "react-feather";
import { connect } from "react-redux";

import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/TaskTags.css";
import TaskTag from "./TaskTag";

interface IProps {
    currentTask: ITask;
    tags: string[];
    tasks: ITask[];
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
                {taggingTask &&
                    <form
                        onSubmit={() => {
                            const tag = newTag.trim();

                            if (tag !== "" && !tags.includes(tag)) {
                                updateCurrentTask({
                                    ...currentTask,
                                    tags: [...tags, tag].sort(),
                                });
                            }

                            this.setState({ taggingTask: false, newTag: "" });
                        }}
                    >
                        <AutoComplete
                            ref={(input) => this.input = input}
                            getItemValue={(tag) => tag}
                            items={this.allTags}
                            renderItem={(tag: string, highlighted: boolean) =>
                                <div
                                    className={highlighted
                                        ? "TaskTags-tag-highlighted"
                                        : "TaskTags-tag"}
                                >
                                    {tag}
                                </div>}
                            value={newTag}
                            onChange={({ target: { value } }) => this.setState({ newTag: value })}
                            onSelect={(newTag) => this.setState({ newTag })}
                            inputProps={{
                                className: "TaskTags-input",
                                onBlur: () => this.setState({ taggingTask: false }),
                                placeholder: "tag name",
                            }}
                        />
                    </form>}
            </div>
        );
    }

    public componentDidUpdate(_, { taggingTask }: IState) {
        if (!taggingTask && this.state.taggingTask) {
            this.input.focus();
        }
    }

    private get allTags(): string[] {
        return _.uniq(_.flatMap(this.props.tasks, ({ tags }) => tags)).sort();
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TaskTags);
