import * as React from "react";
import Book = require("react-icons/lib/go/book");
import Todo = require("react-icons/lib/md/playlist-add-check");
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./style/Page.css";

interface IProps {
    menu: any;
    signedIn: boolean;
}

class Page extends React.Component<IProps> {
    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
        }

        return (
            <div className="Page-container">
                <div className="Page-menu-blank" />
                <div className="Page-menu">
                    {this.props.menu}
                    <div className="Page-menu-buttons">
                        <Link to="/tasks"><Todo /></Link>
                        <Link to="/books"><Book /></Link>
                    </div>
                </div>
                <div className="Page-main">
                    {this.props.children}
                </div>
                <div className="Page-blank" />
            </div>
        );
    }
}

export default connect(({ authState }) => authState)(Page);
