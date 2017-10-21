import waves = require("node-waves");
import "node-waves/dist/waves.css";
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
    private button: HTMLButtonElement;

    public render() {
        const { children, className, onClick, onMouseOver, onMouseOut, style, type }
            = this.props;

        return (
            <button
                ref={(button) => this.button = button}
                className={className || "Button-container"}
                onClick={onClick && ((event) => {
                    onClick();
                    event.stopPropagation();
                })}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                style={style}
                type={type}
            >
                {children}
            </button>
        );
    }

    public componentDidMount() {
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        if (this.button) {
            waves.attach(this.button, ["waves-light"]);
            waves.init();
        }
    }
}
