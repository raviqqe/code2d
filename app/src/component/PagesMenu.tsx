import * as React from "react";
import Article = require("react-icons/lib/fa/file-code-o");
import Menu = require("react-icons/lib/md/menu");
import Video = require("react-icons/lib/md/ondemand-video");
import Task = require("react-icons/lib/md/playlist-add-check");

import PagesMenuButton from "./PagesMenuButton";
import "./style/PagesMenu.css";

interface IState {
    mouseOver: boolean;
}

export default class extends React.Component<{}, IState> {
    public state: IState = { mouseOver: false };

    public render() {
        const { mouseOver } = this.state;

        return (
            <div className="PagesMenu-container">
                <div
                    className={"PagesMenu-icon" + (mouseOver ? "-active" : "")}
                    onMouseOver={() => this.setState({ mouseOver: true })}
                    onMouseOut={() => this.setState({ mouseOver: false })}
                >
                    <Menu />
                </div>
                <div
                    className={"PagesMenu-menu-container" + (mouseOver ? "" : "-invisible")}
                    onMouseOver={() => this.setState({ mouseOver: true })}
                    onMouseOut={() => this.setState({ mouseOver: false })}
                >
                    <PagesMenuButton path="/tasks" icon={<Task />}>tasks</PagesMenuButton>
                    <PagesMenuButton path="/articles" icon={<Article />}>articles</PagesMenuButton>
                    <PagesMenuButton path="/videos" icon={<Video />}>videos</PagesMenuButton>
                </div>
            </div>
        );
    }
}
