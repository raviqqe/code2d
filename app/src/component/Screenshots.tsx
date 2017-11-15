import * as React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./style/Screenshots.css";

const images: string[] = [
    require("../images/screenshots/tasks.png"),
    require("../images/screenshots/articles.png"),
    require("../images/screenshots/videos.png"),
    require("../images/screenshots/books.png"),
];

const mobileImages: string[] = [
    require("../images/screenshots/mobile_tasks.png"),
    require("../images/screenshots/mobile_menu.png"),
    require("../images/screenshots/mobile_articles.png"),
    require("../images/screenshots/mobile_trending.png"),
];

interface IProps {
    isSmallWindow: boolean;
}

class Screenshots extends React.Component<IProps> {
    public render() {
        const { isSmallWindow } = this.props;

        return (
            <div className="Screenshots-container">
                <div className="Screenshots-title">Screenshots</div>
                <Slider dots={true} adaptiveHeight={true} arrows={false} autoplay={true}>
                    {(isSmallWindow ? mobileImages : images).map((path) =>
                        // Image component is not available here somehow.
                        <a key={path} href={path} target="_blank">
                            <img className="Screenshots-image" src={path} />
                        </a>)}
                </Slider>
            </div>
        );
    }
}

export default connect(({ environment }) => environment)(Screenshots);
