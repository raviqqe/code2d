import * as React from "react";
import { connect } from "react-redux";

import Video from "../component/Video";
import VideosMenu from "../component/VideosMenu";
import { IVideo } from "../lib/videos";
import { actionCreators } from "../redux/videos";
import Items from "./Items";

interface IProps {
    currentItem: IVideo | null;
    doneItems: IVideo[];
    setCurrentItem: (video: IVideo) => void;
    setItems: (videos: IVideo[]) => void;
    todoItems: IVideo[];
}

class Videos extends React.Component<IProps> {
    public render() {
        return <Items itemComponent={Video} menuComponent={VideosMenu} {...this.props} />;
    }
}

export default connect(({ videos }) => videos, actionCreators)(Videos);
