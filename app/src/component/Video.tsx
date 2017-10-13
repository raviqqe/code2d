import * as React from "react";
import { connect } from "react-redux";

import { IVideo } from "../lib/videos";
import { actionCreators } from "../redux/videos";
import Item from "./Item";
import LabeledDate from "./LabeledDate";
import "./style/Video.css";

interface IProps extends IVideo {
    currentItem: IVideo | null;
    detailed: boolean;
    done: boolean;
    highlighted?: boolean;
    toggleItemState: (video: IVideo) => void;
    removeItem: (video: IVideo) => void;
    setCurrentItem: (video: IVideo | null) => void;
}

class Video extends React.Component<IProps> {
    public render() {
        const { description, embedUrl, name, publishedAt, url } = this.video;

        return (
            <Item
                {...this.props}
                details={[
                    <div key="video" className="Video-wrapper">
                        <iframe
                            id="ytplayer"
                            src={embedUrl}
                            frameBorder="0"
                            allowFullScreen={true}
                        />
                    </div>,
                    description &&
                    <div key="description" className="Video-description">{description}</div>,
                    publishedAt &&
                    <LabeledDate key="publishedOn" label="Published on" value={publishedAt} />,
                ]}
                href={url}
                item={this.video}
            />
        );
    }

    private get video(): IVideo {
        const { id, description, embedUrl, name, publishedAt, url } = this.props;
        return { id, description, embedUrl, name, publishedAt, url };
    }
}

export default connect(null, actionCreators)(Video);
