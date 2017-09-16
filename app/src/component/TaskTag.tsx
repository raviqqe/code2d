import * as _ from "lodash";
import * as React from "react";

import "./style/TaskTag.css";

interface IProps {
    highlight?: boolean;
    onClick?: () => void;
    tag: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { highlight, onClick, tag } = this.props;

        return (
            <div
                className={this.containerClassName}
                onClick={(event) => {
                    if (onClick) {
                        onClick();
                    }

                    event.stopPropagation();
                }}
            >
                {tag}
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
