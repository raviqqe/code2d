import * as _ from "lodash";
import * as React from "react";

import "./style/TaskTag.css";

interface IProps {
    onClick?: () => void;
    tag: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { onClick, tag } = this.props;

        return (
            <div
                className="TaskTag-container"
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
}
