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
        const { children, className, onClick, onMouseOut, onMouseOver } = this.props;

        return (
            <div
                className={className || "ItemLike-container"}
                onClick={onClick}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
            >
                {children}
            </div>
        );
    }
}
