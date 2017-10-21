import * as React from "react";

import Button from "./Button";
import "./style/CircleButton.css";

interface IProps {
    className?: string;
    onClick: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, className, onClick } = this.props;

        return (
            <Button
                className={className || "CircleButton-container"}
                onClick={onClick}
            >
                {children}
            </Button>
        );
    }
}
