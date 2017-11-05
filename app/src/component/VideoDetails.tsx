import { IVideo } from "common/domain/video";
import * as React from "react";

import LabeledDate from "./LabeledDate";
import "./style/VideoDetails.css";

interface IProps extends IVideo {
    detailed: boolean;
}

export default class extends React.Component<IProps> {
    public render() {
        const { description, detailed, embedUrl, publishedAt } = this.props;

        const video = (
            <div key="video" className="VideoDetails-video">
                <iframe
                    id="ytplayer"
                    src={embedUrl}
                    frameBorder="0"
                    allowFullScreen={true}
                />
            </div>
        );

        const details = [
            <LabeledDate key="publishedOn" label="Published on" value={publishedAt} />,
            detailed && description &&
            <div key="description" className="VideoDetails-description">{description}</div>,
        ];

        if (detailed) {
            return [video, ...details];
        }

        return [...details, video];
    }
}
