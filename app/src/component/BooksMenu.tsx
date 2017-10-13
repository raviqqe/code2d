import * as React from "react";

import CreateBook from "./CreateBook";
import ItemsMenu from "./ItemsMenu";
import TopSalesBooks from "./TopSalesBooks";

interface IProps {
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
}

export default class extends React.Component<IProps> {
    public render() {
        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateBook />}
                doneButtonText="read"
                todoButtonText="to read"
            >
                <TopSalesBooks />
            </ItemsMenu>
        );
    }
}
