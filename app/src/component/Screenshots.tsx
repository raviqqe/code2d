import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./style/Screenshots.css";

export default class extends React.Component {
    public render() {
        return (
            <div className="Screenshots-container">
                <div className="Screenshots-title">Screenshots</div>
                <Slider dots={true} adaptiveHeight={true} arrows={false} autoplay={true}>
                    <img src={require("../images/screenshots/tasks.png")} />
                    <img src={require("../images/screenshots/articles.png")} />
                    <img src={require("../images/screenshots/videos.png")} />
                </Slider>
            </div>
        );
    }
}
