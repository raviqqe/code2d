import * as React from "react";

import "./style/Button.css";

interface IProps {
    className?: string;
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    style?: object;
    type?: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, className, onClick, onMouseOver, onMouseOut, style, type }
            = this.props;

        return (
            <button
                className={"Button-container " + className}
                onClick={(event) => {
                    onClick();
                    event.stopPropagation();
                }}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                style={style}
                type={type}
            >
                {children}
            </button>
        );
    }
}
