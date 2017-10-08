import * as React from "react";

import "./style/ItemLike.css";

interface IProps {
    className?: string;
    onClick?: () => void;
    onMouseOut?: () => void;
    onMouseOver?: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { className, onClick, onMouseOut, onMouseOver } = this.props;

        return (
            <div
                className={"ItemLike-container" + (className ? ` ${className}` : "")}
                onClick={onClick}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            >
                {this.props.children}
            </div>
        );
    }
}
