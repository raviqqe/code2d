import * as React from "react";
import { connect } from "react-redux";

import { IVideo } from "../lib/videos";
import { actionCreators } from "../redux/videos";
import Item from "./Item";
import "./style/Video.css";

interface IProps extends IVideo {
    currentItem: IVideo | null;
    detailed: boolean;
    done: boolean;
    toggleItemState: (video: IVideo) => void;
    removeItem: (video: IVideo) => void;
    setCurrentItem: (video: IVideo | null) => void;
}

class Video extends React.Component<IProps> {
    public render() {
        const { description, embedUri, name, publishedAt, uri } = this.video;

        return (
            <Item
                {...this.props}
                details={[
                    <div key="video" className="Video-wrapper">
                        <iframe
                            id="ytplayer"
                            src={embedUri}
                            frameBorder="0"
                            allowFullScreen={true}
                        />
                    </div>,
                    description && <div key="description">{description}</div>,
                    publishedAt &&
                    <div key="publishedOn" className="Video-date">
                        Published on: {(new Date(publishedAt)).toLocaleDateString()}
                    </div>]}
                href={uri}
                item={this.video}
            />
        );
    }

    private get video(): IVideo {
        const { id, description, embedUri, name, publishedAt, uri } = this.props;
        return { id, description, embedUri, name, publishedAt, uri };
    }
}

export default connect(({ videos }) => videos, actionCreators)(Video);
