import * as React from "react";
import { connect } from "react-redux";

import { extractVideo, IVideo } from "../lib/videos";
import { actionCreators } from "../redux/videos";
import Button from "./Button";
import ItemLike from "./ItemLike";
import ItemName from "./ItemName";
import "./style/SimpleVideo.css";
import VideoDetails from "./VideoDetails";

interface IProps extends IVideo {
    addToTodoList: (video: IVideo) => void;
}

class SimpleVideo extends React.Component<IProps> {
    public render() {
        const { addToTodoList, name, url } = this.props;
        const video = extractVideo(this.props);

        return (
            <ItemLike className="SimpleVideo-container">
                <ItemName href={url} text={name} />
                <VideoDetails detailed={false} {...video} />
                <Button className="SimpleVideo-button" onClick={() => addToTodoList(video)}>
                    Add to to-watch list
                </Button>
            </ItemLike>
        );
    }
}

export default connect(null, actionCreators)(SimpleVideo);
