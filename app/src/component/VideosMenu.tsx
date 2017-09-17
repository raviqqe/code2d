import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/videos";
import ItemsMenu from "./ItemsMenu";

interface IProps {
    done: boolean;
    toggleItemsState: () => void;
}

class VideosMenu extends React.Component<IProps> {
    public render() {
        return <ItemsMenu {...this.props} />;
    }
}

export default connect(({ videos }) => videos, actionCreators)(VideosMenu);
