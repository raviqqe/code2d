import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { extractTagsFromTasks, ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/Menu.css";
import TaskTag from "./TaskTag";

interface IProps {
    currentTag: string | null;
    done: boolean;
    setCurrentTag: (tag: string | null) => void;
    items: ITask[];
    toggleItemsState: () => void;
}

class Menu extends React.Component<IProps> {
    public render() {
        const { currentTag, done, items, toggleItemsState, setCurrentTag } = this.props;

        return (
            <div className="Menu-container">
                <div
                    className={done ? "Menu-button" : "Menu-button-highlighted"}
                    onClick={() => done && toggleItemsState()}
                >
                    todo
                </div>
                <div
                    className={done ? "Menu-button-highlighted" : "Menu-button"}
                    onClick={() => !done && toggleItemsState()}
                >
                    done
                </div>
                <div className="Menu-tags">
                    {extractTagsFromTasks(items).map((tag, index) =>
                        <TaskTag
                            key={index}
                            tag={tag}
                            highlight={tag === currentTag}
                            onClick={() => setCurrentTag(tag === currentTag ? null : tag)}
                        />)}
                </div>
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Menu);
