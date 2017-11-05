import { extractVideo, IVideo } from "common/domain/video";
import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/videos";
import Item from "./Item";
import VideoDetails from "./VideoDetails";

interface IProps extends IVideo {
    detailed: boolean;
    done: boolean;
    highlighted?: boolean;
    toggleItemState: (video: IVideo) => void;
    removeItem: (video: IVideo) => void;
    setCurrentItem: (video: IVideo | null) => void;
}

class Video extends React.Component<IProps> {
    public render() {
        const video = extractVideo(this.props);

        return (
            <Item
                {...this.props}
                details={<VideoDetails detailed={true} {...video} />}
                href={video.url}
                item={video}
            />
        );
    }
}

export default connect(null, actionCreators)(Video);
