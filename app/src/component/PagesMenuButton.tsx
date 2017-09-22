import * as React from "react";
import { Link } from "react-router-dom";

import "./style/PagesMenuButton.css";

interface IProps {
    icon: JSX.Element;
    path: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, icon, path } = this.props;

        return (
            <div
                className={path === window.location.pathname
                    ? "PagesMenuButton-container-highlighted"
                    : "PagesMenuButton-container"}
            >
                <Link to={path}>
                    <div className="PagesMenuButton-icon">{icon}</div> {children}
                </Link>
            </div>
        );
    }
}
