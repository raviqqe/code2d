import * as React from "react";
import Article = require("react-icons/lib/fa/file-code-o");
import Book = require("react-icons/lib/go/book");
import Todo = require("react-icons/lib/md/playlist-add-check");
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./style/Items.css";

interface IProps {
    createItem: JSX.Element;
    currentItem: JSX.Element;
    list: JSX.Element;
    menu: JSX.Element;
    signedIn: boolean;
}

class Items extends React.Component<IProps> {
    public render() {
        const { createItem, currentItem, list, menu, signedIn } = this.props;

        if (!signedIn) {
            return <Redirect to="/sign-in" />;
        }

        return (
            <div className="Items-container">
                <div className="Items-menu-blank" />
                <div className="Items-menu">
                    {menu}
                    <div className="Items-menu-buttons">
                        <Link to="/tasks"><Todo /></Link>
                        <Link to="/articles"><Article /></Link>
                    </div>
                </div>
                <div className="Items-main">
                    {list}
                    <div className="Items-side-bar">
                        {currentItem || <div />}
                        {createItem}
                    </div>
                </div>
                <div className="Items-blank" />
            </div>
        );
    }
}

export default connect(({ authState }) => authState)(Items);
