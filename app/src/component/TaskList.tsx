import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import ITask from "../lib/task";
import "./style/TaskList.css";
import Task from "./Task";

function reorderTask(tasks, i, j) {
    tasks = [...tasks];
    tasks.splice(j, 0, tasks.splice(i, 1)[0]);
    return tasks;
}

interface IState {
    tasks: ITask[];
}

export default class extends React.Component<{}, IState> {
    public state = {
        tasks: [
            { id: "foo", name: "foo", description: "Hello, world!" },
            { id: "bar", name: "bar", description: "Hello, Japan!" },
            { id: "baz", name: "baz", description: "Hello, me!" },
        ],
    };

    public render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="taskList">
                    {({ innerRef }) => (
                        <div className="TaskList-container" ref={innerRef}>
                            {this.state.tasks.map((task) => (
                                <Draggable key={task.id} draggableId={task.id}>
                                    {(provided) => (
                                        <div>
                                            <div
                                                className="TaskList-task"
                                                ref={provided.innerRef}
                                                style={provided.draggableStyle}
                                                {...provided.dragHandleProps}
                                            >
                                                <Task {...task} />
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }

    private onDragEnd = ({ destination, source }): void => {
        if (!destination) {
            return;
        }

        this.setState({
            tasks: reorderTask(this.state.tasks, source.index, destination.index),
        });
    }
}
