import * as React from "react";
import { Link, withRouter } from "react-router-dom";

import "./style/MenuLink.css";

interface IProps {
    location: { pathname: string };
    path: string;
}

class MenuLink extends React.Component<IProps> {
    public render() {
        const { children, location: { pathname }, path } = this.props;

        return (
            <div
                className={path === pathname
                    ? "MenuLink-container-highlighted"
                    : "MenuLink-container"}
            >
                <Link to={path}>{children}</Link>
            </div>
        );
    }
}

export default withRouter(MenuLink);
