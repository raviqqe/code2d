import * as React from "react";

import "./style/Button.css";

interface IProps {
    className?: string;
    onClick?: () => void;
    style?: object;
    type?: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, className, onClick, style, type } = this.props;

        return (
            <button
                className={"Button-container " + className}
                onClick={onClick}
                style={style}
                type={type}
            >
                {children}
            </button>
        );
    }
}
