import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default class extends React.Component {
    public render() {
        return (
            <Slider>
                <img src={require("../images/screenshots/tasks.png")} />
                <img src={require("../images/screenshots/articles.png")} />
                <img src={require("../images/screenshots/videos.png")} />
            </Slider>
        );
    }
}
