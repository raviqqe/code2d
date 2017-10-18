import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./style/Screenshots.css";

const images: string[] = [
    require("../images/screenshots/tasks.png"),
    require("../images/screenshots/articles.png"),
    require("../images/screenshots/videos.png"),
];

export default class extends React.Component {
    public render() {
        return (
            <div className="Screenshots-container">
                <div className="Screenshots-title">Screenshots</div>
                <Slider dots={true} adaptiveHeight={true} arrows={false} autoplay={true}>
                    {images.map((path) =>
                        // Image component is not available here somehow.
                        <a key={path} href={path} target="_blank">
                            <img className="Screenshots-image" src={path} />
                        </a>)}
                </Slider>
            </div>
        );
    }
}
