import * as React from "react";
import Article = require("react-icons/lib/fa/file-code-o");
import Menu = require("react-icons/lib/md/menu");
import Video = require("react-icons/lib/md/ondemand-video");
import Task = require("react-icons/lib/md/playlist-add-check");

import PageButton from "./PageButton";
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
                    <PageButton page="tasks" icon={<Task />}>tasks</PageButton>
                    <PageButton page="articles" icon={<Article />}>articles</PageButton>
                    <PageButton page="videos" icon={<Video />}>videos</PageButton>
                </div>
            </div>
        );
    }
}
