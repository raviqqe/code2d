import { ITask } from "common/domain/task";
import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/tasks";
import Button from "./Button";
import CreateTask from "./CreateTask";
import ItemsMenu from "./ItemsMenu";
import "./style/TasksMenu.css";
import TaskTag from "./TaskTag";

interface IProps {
    currentTag: string | null;
    done: boolean;
    setCurrentTag: (tag: string | null) => void;
    tags: string[];
    onItemsStateChange: (done: boolean) => void;
}

class TasksMenu extends React.Component<IProps> {
    public render() {
        const { currentTag, setCurrentTag, tags } = this.props;

        return (
            <ItemsMenu {...this.props} createItem={<CreateTask />}>
                {tags.length !== 0 &&
                    <div className="TasksMenu-tags">
                        <div className="TasksMenu-tags-title">tags</div>
                        {tags.map((tag, index) =>
                            <TaskTag
                                key={index}
                                tag={tag}
                                highlighted={currentTag === null ? null : tag === currentTag}
                                onClick={() => setCurrentTag(tag === currentTag ? null : tag)}
                            />)}
                        <Button
                            className={
                                "TasksMenu-no-tag-button" +
                                (currentTag === "" ? "-highlighted" : "")}
                            onClick={() => setCurrentTag(currentTag === "" ? null : "")}
                        >
                            none
                        </Button>
                    </div>}
            </ItemsMenu>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TasksMenu);
