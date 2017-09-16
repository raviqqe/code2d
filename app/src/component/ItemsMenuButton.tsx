import * as React from "react";
import { Link } from "react-router-dom";

import "./style/ItemsMenuButton.css";

interface IProps {
    path: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, path } = this.props;

        return (
            <div
                className={path === window.location.pathname
                    ? "ItemsMenuButton-container-highlighted"
                    : "ItemsMenuButton-container"}
            >
                <Link to={path}>{children}</Link>
            </div>
        );
    }
}
