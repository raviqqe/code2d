import * as React from "react";
import { Link } from "react-router-dom";

import "./style/MenuLink.css";

interface IProps {
    path: string;
}

interface IState {
    path: string;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { path: "" };

    public componentDidMount() {
        window.onpopstate = () => this.setState({ path: window.location.pathname });
    }

    public render() {
        const { children, path } = this.props;

        return (
            <div
                className={path === window.location.pathname
                    ? "MenuLink-container-highlighted"
                    : "MenuLink-container"}
            >
                <Link to={path}>{children}</Link>
            </div>
        );
    }
}
