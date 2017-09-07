import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/tasks";
import "./style/Menu.css";

interface IProps {
    done: boolean;
    toggleTasksState: () => void;
}

class Menu extends React.Component<IProps> {
    public render() {
        const { done, toggleTasksState } = this.props;

        return (
            <div className="Menu-container">
                <div
                    className={done ? "Menu-button" : "Menu-button-highlighted"}
                    onClick={() => done && toggleTasksState()}
                >
                    todo
                </div>
                <div
                    className={done ? "Menu-button-highlighted" : "Menu-button"}
                    onClick={() => !done && toggleTasksState()}
                >
                    done
                </div>
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Menu);
