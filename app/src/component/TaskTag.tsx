import * as _ from "lodash";
import * as React from "react";
import Remove = require("react-icons/lib/md/close");

import "./style/TaskTag.css";

interface IProps {
    showRemoveButton?: boolean;
    highlight?: boolean;
    onClick?: () => void;
    tag: string;
}

interface IState {
    mouseOver: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { mouseOver: false };

    public render() {
        const { highlight, onClick, tag } = this.props;
        const showRemoveButton = this.props.showRemoveButton && this.state.mouseOver;

        return (
            <div
                className={this.containerClassName}
                onClick={(event) => {
                    if (onClick) {
                        onClick();
                    }

                    event.stopPropagation();
                }}
                onMouseOver={() => this.setState({ mouseOver: true })}
                onMouseOut={() => this.setState({ mouseOver: false })}
            >
                <div style={showRemoveButton ? { visibility: "hidden" } : {}}>{tag}</div>
                <div
                    className="TaskTag-remove-button"
                    style={showRemoveButton ? {} : { display: "none" }}
                >
                    <Remove />
                </div>
            </div>
        );
    }

    private get containerClassName(): string {
        const { highlight } = this.props;

        if (_.isBoolean(highlight)) {
            return highlight ? "TaskTag-container-highlighted" : "TaskTag-container-unhighlighted";
        }

        return "TaskTag-container";
    }
}
