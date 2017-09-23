import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import ItemList from "../component/ItemList";
import Task from "../component/Task";
import TasksMenu from "../component/TasksMenu";
import { ITask } from "../lib/tasks";
import { actionCreators as settingsActionCreators } from "../redux/settings";
import { actionCreators as tasksActionCreators } from "../redux/tasks";
import Items from "./Items";
import Timer from "./Timer";

interface IProps {
    currentTag: string | null;
    currentItem: ITask | null;
    items: ITask[];
    done: boolean;
    notificationOn: boolean | null;
    requestNotificationPermission: () => void;
    setCurrentItem: (task: ITask) => void;
    setItems: (tasks: ITask[]) => void;
    timerOn: boolean;
}

class Tasks extends React.Component<IProps> {
    public render() {
        const { currentItem, currentTag, done, timerOn } = this.props;

        if (timerOn) {
            return <Timer />;
        }

        return (
            <Items
                currentItem={currentItem && <Task detailed={true} done={done} {...currentItem} />}
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
        if (this.props.notificationOn === null) {
            this.props.requestNotificationPermission();
        }
    }

    private get itemsByTag(): ITask[] {
        const { currentTag, items } = this.props;

        return currentTag === null
            ? items
            : _.filter(items, ({ tags }) => tags.includes(currentTag));
    }
}

export default connect(
    ({ settings, tasks, timer }) => ({ ...settings, ...tasks, timerOn: timer.on }),
    { ...settingsActionCreators, ...tasksActionCreators },
)(Tasks);
