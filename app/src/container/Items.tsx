import * as React from "react";
import Save = require("react-icons/lib/md/save");
import { connect } from "react-redux";

import CircleButton from "../component/CircleButton";
import ItemList from "../component/ItemList";
import ItemsMenuButton from "../component/ItemsMenuButton";
import { IItem, include } from "../lib/items";
import "./style/Items.css";

interface IProps<A extends IItem> {
    itemComponent: (props) => JSX.Element;
    currentItem: A | null;
    doneItems: A[];
    fixed?: boolean;
    isSmallWindow: boolean;
    menuComponent: (props) => JSX.Element;
    setCurrentItem: (item: A) => void;
    setItems: (items: A[], done: boolean) => void;
    signedIn: boolean;
    todoItems: A[];
    touchable: boolean;
}

interface IState {
    done: boolean;
    fixed: boolean;
}

class Items<A extends IItem> extends React.Component<IProps<A>, IState> {
    public state: IState = { done: false, fixed: false };

    public render() {
        const { currentItem, doneItems, isSmallWindow, todoItems, touchable, signedIn } = this.props;
        const { done } = this.state;

        const Item = this.props.itemComponent;
        const ItemsMenu = this.props.menuComponent;

        const itemsMenu = (
            <ItemsMenu
                done={done}
                onItemsStateChange={(done) => this.setState({ done })}
                makeItemListSortable={() => this.setState({ fixed: false })}
            />
        );

        const itemListProps = {
            ...this.props,
            fixed: this.props.fixed || this.state.fixed,
            sorting: touchable && !this.state.fixed,
        };

        return (
            <div className="Items-container">
                <div className="Items-content">
                    {!isSmallWindow && itemsMenu}
                    <div className="Items-main">
                        <ItemList
                            style={done ? { display: "none" } : {}}
                            done={false}
                            items={todoItems}
                            {...itemListProps}
                        />
                        <ItemList
                            style={done ? {} : { display: "none" }}
                            done={true}
                            items={doneItems}
                            {...itemListProps}
                        />
                        {!isSmallWindow &&
                            <div className="Items-current-item-container">
                                {currentItem &&
                                    <Item detailed={true} done={done} {...currentItem} />}
                            </div>}
                        {isSmallWindow && !this.state.fixed &&
                            <div className="Items-fix-list-button-container">
                                <CircleButton onClick={() => this.setState({ fixed: true })}>
                                    <Save />
                                </CircleButton>
                            </div>}
                        {isSmallWindow && this.state.fixed && <ItemsMenuButton itemsMenu={itemsMenu} />}
                    </div>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        if (this.props.isSmallWindow) {
            this.setState({ fixed: true });
        }

        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const { currentItem, doneItems, setCurrentItem, todoItems } = this.props;
        const items = this.state.done ? doneItems : todoItems;

        if (currentItem === null && items.length !== 0 ||
            currentItem !== null && !include(items, currentItem)) {
            setCurrentItem(items[0] || null);
        }
    }
}

export default connect(({ authentication, environment }) => ({ ...authentication, ...environment }))(Items);
