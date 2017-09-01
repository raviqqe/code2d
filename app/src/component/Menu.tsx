import * as React from "react";
import { Link } from "react-router-dom";

import "./style/Menu.css";

export default class extends React.Component {
    public render() {
        return (
            <div className="Menu-container">
                <div className="Menu-link">
                    <Link to="/tasks/todo">todo</Link>
                </div>
                <div className="Menu-link">
                    <Link to="/tasks/done">done</Link>
                </div>
            </div>
        );
    }
}
