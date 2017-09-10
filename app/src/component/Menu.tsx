import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import "./style/Menu.css";
import TaskTag from "./TaskTag";

interface IProps {
    currentTag: string | null;
    done: boolean;
    setCurrentTag: (tag: string | null) => void;
    tasks: ITask[];
    toggleTasksState: () => void;
}

class Menu extends React.Component<IProps> {
    public render() {
        const { currentTag, done, toggleTasksState, setCurrentTag } = this.props;

        return (
            <div className="Menu-container">
                <div
                    className={done ? "Menu-button" : "Menu-button-highlighted"}
                    onClick={() => done && toggleTasksState()}
                >
                    todo
                </div>
                <div
                    className={done ? "Menu-button-highlighted" : "Menu-button"}
                    onClick={() => !done && toggleTasksState()}
                >
                    done
                </div>
                <div className="Menu-tags">
                    {this.tags.map((tag, index) =>
                        <TaskTag
                            key={index}
                            tag={tag}
                            onClick={() => setCurrentTag(tag === currentTag ? null : tag)}
                        />)}
                </div>
            </div>
        );
    }

    private get tags(): string[] {
        return _.uniq(_.flatMap(this.props.tasks, ({ tags }) => tags)).sort();
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Menu);
