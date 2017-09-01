import * as React from "react";
import { Link } from "react-router-dom";

import MenuLink from "./MenuLink";
import "./style/Menu.css";

export default class extends React.Component {
    public render() {
        return (
            <div className="Menu-container">
                <MenuLink path="/tasks/todo">todo</MenuLink>
                <MenuLink path="/tasks/done">done</MenuLink>
            </div>
        );
    }
}
