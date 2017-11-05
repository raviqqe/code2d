import { IVideo } from "common/domain/video";
import * as React from "react";
import { connect } from "react-redux";

import Video from "../component/Video";
import VideosMenu from "../component/VideosMenu";
import { actionCreators } from "../redux/videos";
import Items from "./Items";

interface IProps {
    currentItem: IVideo | null;
    doneItems: IVideo[];
    setCurrentItem: (video: IVideo) => void;
    setItems: (items: IVideo[], done: boolean) => void;
    todoItems: IVideo[];
}

class Videos extends React.Component<IProps> {
    public render() {
        return <Items itemComponent={Video} menuComponent={VideosMenu} {...this.props} />;
    }
}

export default connect(({ videos }) => videos, actionCreators)(Videos);
