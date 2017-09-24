import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { arrayMove } from "react-sortable-hoc";

import { equal, IItem } from "../lib/items";
import "./style/SortableItems.css";

interface IProps<A extends IItem> {
    component: any;
    done: boolean;
    fixed: boolean;
    currentItem: A | null;
    items: A[];
    setItems: (args: { done: boolean, items: A[] }) => void;
}

export default class SortableItems<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { component, currentItem, done, fixed, items, setItems } = this.props;
        const Item = component;

        return (
            <div className="SortableItems-container">
                <DragDropContext
                    onDragEnd={({ destination, source }) => {
                        if (!destination) {
                            return;
                        }

                        setItems({
                            done,
                            items: arrayMove(
                                [...this.props.items],
                                source.index,
                                destination.index),
                        });
                    }}
                >
                    <Droppable droppableId={`droppable-${done}`} isDropDisabled={fixed}>
                        {(provided, snapshot) =>
                            <div ref={provided.innerRef}>
                                {items.map((item) =>
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        isDragDisabled={fixed}
                                    >
                                        {(provided, snapshot) =>
                                            <div>
                                                <div
                                                    ref={provided.innerRef}
                                                    style={provided.draggableStyle}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Item
                                                        done={done}
                                                        highlighted={
                                                            currentItem && equal(item, currentItem)}
                                                        {...item}
                                                    />
                                                </div>
                                                {provided.placeholder}
                                            </div>}
                                    </Draggable>)}
                                {provided.placeholder}
                            </div>}
                    </Droppable>
                </DragDropContext>
            </div >
        );
    }
}
