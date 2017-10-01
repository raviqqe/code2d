import * as React from "react";
import Article = require("react-icons/lib/fa/file-code-o");
import Menu = require("react-icons/lib/md/menu");
import Video = require("react-icons/lib/md/ondemand-video");
import Task = require("react-icons/lib/md/playlist-add-check");

import PagesMenuButton from "./PagesMenuButton";
import "./style/PagesMenu.css";

interface IState {
    showMenu: boolean;
}

export default class extends React.Component<{}, IState> {
    public state: IState = { showMenu: false };

    public render() {
        const { showMenu } = this.state;

        return (
            <div className="PagesMenu-container">
                <div
                    className={"PagesMenu-icon" + (showMenu ? "-active" : "")}
                    onClick={() => this.setState({ showMenu: !showMenu })}
                >
                    <Menu />
                </div>
                <div
                    className="PagesMenu-box-background"
                    style={showMenu ? {} : { display: "none" }}
                    onClick={() => this.setState({ showMenu: false })}
                />
                <div
                    className={"PagesMenu-box" + (showMenu ? "" : "-invisible")}
                    onClick={(event) => event.stopPropagation()}
                >
                    <PagesMenuButton page="tasks" icon={<Task />}>tasks</PagesMenuButton>
                    <PagesMenuButton page="articles" icon={<Article />}>articles</PagesMenuButton>
                    <PagesMenuButton page="videos" icon={<Video />}>videos</PagesMenuButton>
                </div>
            </div>
        );
    }
}
