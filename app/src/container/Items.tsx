import * as React from "react";
import ScrollBar = require("react-perfect-scrollbar");
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";

import ItemList from "../component/ItemList";
import { IItem, include } from "../lib/items";
import "./style/Items.css";

interface IProps<A extends IItem> {
    itemComponent: (props) => JSX.Element;
    currentItem: A | null;
    doneItems: A[];
    fixed?: boolean;
    menuComponent: (props) => JSX.Element;
    setCurrentItem: (item: A) => void;
    setItems: (items: A[], done: boolean) => void;
    signedIn: boolean;
    todoItems: A[];
}

interface IState {
    done: boolean;
}

class Items<A extends IItem> extends React.Component<IProps<A>, IState> {
    public state: IState = { done: false };

    public render() {
        const { currentItem, doneItems, todoItems, signedIn } = this.props;
        const { done } = this.state;

        const Item = this.props.itemComponent;
        const ItemsMenu = this.props.menuComponent;

        return (
            <div className="Items-container">
                <div className="Items-menu-blank" />
                <ItemsMenu done={done} onItemsStateChange={(done) => this.setState({ done })} />
                <div className="Items-main">
                    <ScrollBar>
                        <div style={done ? { display: "none" } : {}}>
                            <ItemList component={Item} done={false} items={todoItems} {...this.props} />
                        </div>
                        <div style={done ? {} : { display: "none" }}>
                            <ItemList component={Item} done={true} items={doneItems} {...this.props} />
                        </div>
                    </ScrollBar>
                    <ScrollBar>
                        <div className="Items-current-item-container">
                            {currentItem && <Item detailed={true} done={done} {...currentItem} />}
                        </div>
                    </ScrollBar>
                </div>
                <div className="Items-blank" />
            </div>
        );
    }

    public componentDidMount() {
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

export default connect(({ authentication }) => authentication)(Items);
