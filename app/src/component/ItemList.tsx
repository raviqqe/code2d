import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { arrayMove } from "react-sortable-hoc";

import { equal, IItem } from "../lib/items";
import "./style/ItemList.css";

interface IProps<A extends IItem> {
    component: (props) => JSX.Element;
    currentItem: A | null;
    done: boolean;
    fixed?: boolean;
    items: A[];
    setItems: (items: A[], done: boolean) => void;
}

export default class ItemList<A extends IItem> extends React.Component<IProps<A>> {
    public render() {
        const { component, currentItem, done, fixed, items, setItems } = this.props;
        const Item = component;

        if (items.length === 0) {
            return <div className="ItemList-container">There is no item.</div>;
        }

        return (
            <DragDropContext
                onDragEnd={({ destination, source }) => {
                    if (!destination) {
                        return;
                    }

                    setItems(
                        arrayMove([...this.props.items], source.index, destination.index),
                        done);
                }}
            >
                <Droppable droppableId={`droppable-${done}`} isDropDisabled={fixed}>
                    {(provided, snapshot) =>
                        <div ref={provided.innerRef} className="ItemList-container">
                            {items.map((item) =>
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    isDragDisabled={fixed}
                                >
                                    {(provided, snapshot) =>
                                        <div>
                                            <div
                                                className="ItemList-item"
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
            </DragDropContext >
        );
    }
}
