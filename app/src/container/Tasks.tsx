import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import CreateTask from "../component/CreateTask";
import ItemList from "../component/ItemList";
import Task from "../component/Task";
import TasksMenu from "../component/TasksMenu";
import * as notification from "../lib/notification";
import { ITask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import Items from "./Items";
import Timer from "./Timer";

interface IProps {
    creatingItem: boolean;
    currentTag: string | null;
    currentItem: ITask | null;
    items: ITask[];
    done: boolean;
    setCurrentItem: (task: ITask) => void;
    setItems: (tasks: ITask[]) => void;
    timerOn: boolean;
}

class Tasks extends React.Component<IProps> {
    public render() {
        if (this.props.timerOn) {
            return <Timer />;
        }

        const { creatingItem, currentItem, currentTag, done } = this.props;

        return (
            <Items
                createItem={!done && <CreateTask />}
                currentItem={!creatingItem && currentItem &&
                    <Task detailed={true} done={done} {...currentItem} />}
                list={
                    <ItemList
                        component={Task}
                        fixed={currentTag !== null}
                        {...this.props}
                        items={this.itemsByTag}
                    />}
                menu={<TasksMenu />}
            />
        );
    }

    public componentDidMount() {
        notification.requestPermission();
    }

    private get itemsByTag(): ITask[] {
        const { currentTag, items } = this.props;

        return currentTag === null
            ? items
            : _.filter(items, ({ tags }) => tags.includes(currentTag));
    }
}

export default connect(
    ({ tasks, timer }) => ({ ...tasks, timerOn: timer.on }),
    actionCreators,
)(Tasks);
