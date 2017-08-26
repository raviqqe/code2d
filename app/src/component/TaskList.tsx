import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { ITask } from "../lib/task";
import AddTask from "./AddTask";
import "./style/TaskList.css";
import Task from "./Task";

function reorderTask(tasks, i, j) {
    tasks = [...tasks];
    tasks.splice(j, 0, tasks.splice(i, 1)[0]);
    return tasks;
}

class TaskList extends React.Component<{ tasks: ITask[] }> {
    public render() {
        return (
            <div>
                <AddTask />
                <DragDropContext
                    onDragEnd={({ destination, source }): void => {
                        // TODO: Reorder tasks.

                        // if (!destination) {
                        //     return;
                        // }

                        // this.setState({
                        //     tasks: reorderTask(this.props.tasks, source.index, destination.index),
                        // });
                    }}
                >
                    <Droppable droppableId="taskList">
                        {({ innerRef }) => (
                            <div className="TaskList-container" ref={innerRef}>
                                {this.props.tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id}>
                                        {(provided) => (
                                            <div>
                                                <div
                                                    className="TaskList-task"
                                                    ref={provided.innerRef}
                                                    style={provided.draggableStyle}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Task
                                                        {...task}
                                                        onDelete={() => {
                                                            // TODO: Delete a task.

                                                            // const tasks = [...this.props.tasks];

                                                            // tasks.splice(index, 1);

                                                            // this.setState({ tasks });
                                                        }}
                                                    />
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
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks)(TaskList);
