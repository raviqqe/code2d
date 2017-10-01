import * as React from "react";
import Article = require("react-icons/lib/fa/file-code-o");
import Video = require("react-icons/lib/md/ondemand-video");
import Task = require("react-icons/lib/md/playlist-add-check");

import { Page } from "../redux/pages";
import "./style/PageButton.css";

const icons = {
    articles: <Article />,
    tasks: <Task />,
    videos: <Video />,
};

interface IProps {
    current?: boolean;
    onClick: () => void;
    page: Page;
}

export default class PageButton extends React.Component<IProps> {
    public render() {
        const { current, onClick, page } = this.props;

        return (
            <div
                className={"PageButton-container" + (current ? "-current" : "")}
                onClick={onClick}
            >
                <div className="PageButton-icon">{icons[page]}</div> {page}
            </div>
        );
    }
}
