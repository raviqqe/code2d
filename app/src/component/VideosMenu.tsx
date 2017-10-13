import * as React from "react";

import CreateVideo from "./CreateVideo";
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
                createItem={<CreateVideo />}
                doneButtonText="watched"
                todoButtonText="to watch"
            />
        );
    }
}
