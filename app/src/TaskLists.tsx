import * as React from "react";
import Check = require("react-icons/lib/fa/check");
import Copy = require("react-icons/lib/fa/copy");
import Repeat = require("react-icons/lib/fa/repeat");

import TaskList from "./TaskList";
import "./TaskLists.css";

export default class extends React.Component {
    public render() {
        return (
            <div className="TaskLists">
                <TaskList icon={<Copy />} />
                <TaskList icon={<Repeat />} />
                <TaskList icon={<Check />} />
            </div>
        );
    }
}
