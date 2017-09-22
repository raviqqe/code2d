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
                    className={"PagesMenu-box-container" + (showMenu ? "" : "-invisible")}
                    onClick={(event) => {
                        this.setState({ showMenu: false });
                        event.stopPropagation();
                    }}
                >
                    <div className="PagesMenu-box" onClick={(event) => event.stopPropagation()}>
                        <PagesMenuButton path="/tasks" icon={<Task />}>tasks</PagesMenuButton>
                        <PagesMenuButton path="/articles" icon={<Article />}>articles</PagesMenuButton>
                        <PagesMenuButton path="/videos" icon={<Video />}>videos</PagesMenuButton>
                    </div>
                </div>
            </div>
        );
    }
}
