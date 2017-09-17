import * as _ from "lodash";
import * as React from "react";
import AutoComplete = require("react-autocomplete");
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/TaskTags.css";
import TaskTag from "./TaskTag";

interface IProps {
    allTags: string[];
    currentItem: ITask;
    tags: string[];
    updateCurrentItem: (task: ITask) => void;
}

interface IState {
    newTag: string;
    taggingTask: boolean;
}

class TaskTags extends React.Component<IProps, IState> {
    public state: IState = { newTag: "", taggingTask: false };

    private input: { focus: () => void, value: string };

    public render() {
        const { allTags, currentItem, tags, updateCurrentItem } = this.props;
        const { newTag, taggingTask } = this.state;

        return (
            <div>
                <div className="TaskTags-tags">
                    {tags.map((tag, index) =>
                        <TaskTag
                            key={index}
                            tag={tag}
                            onClick={() => {
                                updateCurrentItem({
                                    ...currentItem,
                                    tags: _.filter(tags, (x) => x !== tag),
                                });
                            }}
                        />)}
                    <button
                        style={taggingTask ? { display: "none" } : {}}
                        className="TaskTags-button"
                        onClick={() => this.setState({ taggingTask: true })}
                    >
                        <Plus />
                    </button>
                </div>
                {taggingTask &&
                    <form
                        className={tags.length === 0 ? undefined : "TaskTags-margined-form"}
                        onSubmit={(event) => {
                            const tag = newTag.trim();

                            if (tag !== "" && !tags.includes(tag)) {
                                updateCurrentItem({
                                    ...currentItem,
                                    tags: [...tags, tag].sort(),
                                });
                            }

                            this.setState({ taggingTask: false, newTag: "" });
                            event.preventDefault();
                        }}
                    >
                        <AutoComplete
                            ref={(input) => this.input = input}
                            getItemValue={(tag) => tag}
                            items={allTags}
                            renderItem={(tag: string, highlighted: boolean) =>
                                <div
                                    className={highlighted
                                        ? "TaskTags-tag-highlighted"
                                        : "TaskTags-tag"}
                                >
                                    {tag}
                                </div>}
                            shouldItemRender={(tag, input) =>
                                tag.toLowerCase().slice(0, input.length) === input.toLowerCase()}
                            value={newTag}
                            onChange={({ target: { value } }) => this.setState({ newTag: value })}
                            onSelect={(newTag) => this.setState({ newTag })}
                            inputProps={{
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
}

export default connect(
    ({ tasks: { tags, ...rest } }) => ({ ...rest, allTags: tags }),
    actionCreators,
)(TaskTags);
