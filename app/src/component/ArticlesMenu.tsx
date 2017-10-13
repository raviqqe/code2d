import * as React from "react";

import CreateArticle from "./CreateArticle";
import ItemsMenu from "./ItemsMenu";

interface IProps {
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
}

export default class extends React.Component<IProps> {
    public render() {
        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateArticle />}
                doneButtonText="read"
                todoButtonText="to read"
            />
        );
    }
}
