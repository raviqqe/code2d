import * as React from "react";
import Article = require("react-icons/lib/fa/file-code-o");
import Book = require("react-icons/lib/go/book");
import Video = require("react-icons/lib/md/ondemand-video");
import Todo = require("react-icons/lib/md/playlist-add-check");
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import ItemsMenuButton from "../component/ItemsMenuButton";
import "./style/Items.css";

interface IProps {
    currentItem: JSX.Element;
    list: JSX.Element;
    menu: JSX.Element;
    signedIn: boolean;
}

class Items extends React.Component<IProps> {
    public render() {
        const { currentItem, list, menu, signedIn } = this.props;

        if (!signedIn) {
            return <Redirect to="/sign-in" />;
        }

        return (
            <div className="Items-container">
                <div className="Items-menu-blank" />
                <div className="Items-menu">
                    {menu}
                    <div className="Items-menu-buttons">
                        <ItemsMenuButton path="/tasks"><Todo /></ItemsMenuButton>
                        <ItemsMenuButton path="/articles"><Article /></ItemsMenuButton>
                        <ItemsMenuButton path="/videos"><Video /></ItemsMenuButton>
                    </div>
                </div>
                <div className="Items-main">
                    {list}
                    {currentItem || <div />}
                </div>
                <div className="Items-blank" />
            </div>
        );
    }
}

export default connect(({ authState }) => authState)(Items);
