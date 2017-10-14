import * as React from "react";

import { IVideo } from "../lib/videos";
import LabeledDate from "./LabeledDate";
import "./style/VideoDetails.css";

interface IProps extends IVideo {
    detailed: boolean;
}

export default class extends React.Component<IProps> {
    public render() {
        const { description, detailed, embedUrl, publishedAt } = this.props;

        return [
            (
                <div key="video" className="VideoDetails-video">
                    <iframe
                        id="ytplayer"
                        src={embedUrl}
                        frameBorder="0"
                        allowFullScreen={true}
                    />
                </div>
            ),
            detailed && description &&
            <div key="description" className="VideoDetails-description">{description}</div>,
            <LabeledDate key="publishedOn" label="Published on" value={publishedAt} />,
        ];
    }
}
