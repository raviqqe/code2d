import * as React from "react";

import Button from "./Button";
import "./style/IconedButton.css";

interface IProps {
    className?: string;
    icon: JSX.Element;
    onClick: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, className, icon, onClick } = this.props;

        return (
            <Button
                className={className || "IconedButton-container"}
                onClick={onClick}
            >
                {icon}
                {children}
            </Button>
        );
    }
}
