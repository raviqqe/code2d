import * as _ from "lodash";
import * as React from "react";
import Remove = require("react-icons/lib/md/close");
import { connect } from "react-redux";

import Button from "./Button";
import "./style/TaskTag.css";

interface IProps {
    showRemoveButton?: boolean;
    highlighted?: boolean;
    onClick?: () => void;
    tag: string;
    touchable: boolean;
}

interface IState {
    mouseOver: boolean;
}

class TaskTag extends React.Component<IProps, IState> {
    public state: IState = { mouseOver: false };

    public render() {
        const { highlighted, onClick, showRemoveButton, tag, touchable } = this.props;
        const { mouseOver } = this.state;

        return (
            <Button
                className={this.containerClassName}
                onClick={() => {
                    if (onClick) {
                        onClick();
                    }
                }}
                onMouseOver={() => this.setState({ mouseOver: true })}
                onMouseOut={() => this.setState({ mouseOver: false })}
            >
                <div
                    style={(!touchable && showRemoveButton && mouseOver)
                        ? { visibility: "hidden" } : {}}
                >
                    {tag}
                </div>
                <div
                    className="TaskTag-remove-button"
                    style={(showRemoveButton && (touchable || mouseOver))
                        ? {} : { display: "none" }}
                >
                    <Remove />
                </div>
            </Button>
        );
    }

    private get containerClassName(): string {
        const { highlighted } = this.props;

        if (_.isBoolean(highlighted)) {
            return "TaskTag-container-" + (highlighted ? "highlighted" : "unhighlighted");
        }

        return "TaskTag-container";
    }
}

export default connect(({ environment }) => environment)(TaskTag);
