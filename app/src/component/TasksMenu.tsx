import * as React from "react";
import { connect } from "react-redux";

import { extractTagsFromTasks, ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import ItemsMenu from "./ItemsMenu";
import "./style/TasksMenu.css";
import TaskTag from "./TaskTag";

interface IProps {
    currentTag: string | null;
    done: boolean;
    setCurrentTag: (tag: string | null) => void;
    items: ITask[];
    toggleItemsState: () => void;
}

class TasksMenu extends React.Component<IProps> {
    public render() {
        const { currentTag, items, setCurrentTag } = this.props;

        return (
            <ItemsMenu {...this.props}>
                <div className="TasksMenu-tags">
                    {extractTagsFromTasks(items).map((tag, index) =>
                        <TaskTag
                            key={index}
                            tag={tag}
                            highlight={tag === currentTag}
                            onClick={() => setCurrentTag(tag === currentTag ? null : tag)}
                        />)}
                </div>
            </ItemsMenu>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(TasksMenu);