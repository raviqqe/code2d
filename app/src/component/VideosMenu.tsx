import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/videos";
import CreateVideo from "./CreateVideo";
import ItemsMenu from "./ItemsMenu";

interface IProps {
    done: boolean;
    toggleItemsState: () => void;
}

class VideosMenu extends React.Component<IProps> {
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

export default connect(null, actionCreators)(VideosMenu);
