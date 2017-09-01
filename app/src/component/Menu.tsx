import * as React from "react";
import { Link } from "react-router-dom";

export default class extends React.Component {
    public render() {
        return (
            <div>
                <Link to="/tasks/todo">todo</Link>
                <Link to="/tasks/done">done</Link>
            </div>
        );
    }
}
