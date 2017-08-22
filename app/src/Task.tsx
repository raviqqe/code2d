import * as React from "react";
import { DragSource, DropTarget } from "react-dnd";

import "./Task.css";

interface IProps {
    id: string;
    onDrop: (id: string, swappedId: string) => void;
}

@DragSource("Task", {
    beginDrag: (props) => props,
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
@DropTarget("Task", {
    drop: (droppedTask, monitor) => {
        const draggedTask = monitor.getItem();

        if (droppedTask.id !== draggedTask.id) {
            return droppedTask.onDrop(droppedTask, draggedTask);
        }
    },
}, (connect, monitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    itemType: monitor.getItemType(),
}))
export default class extends React.Component<IProps> {
    public render() {
        const { connectDragSource, connectDropTarget } = this.props as any;

        return connectDragSource(connectDropTarget(
            <div className="Task">{"Task ID:" + this.props.id}</div>));
    }
}
