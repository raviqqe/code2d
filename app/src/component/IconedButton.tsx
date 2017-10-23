import * as React from "react";

import Button from "./Button";
import "./style/IconedButton.css";

interface IProps {
    icon: JSX.Element;
    onClick: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, icon, onClick } = this.props;

        return (
            <Button
                className="IconedButton-container"
                onClick={onClick}
            >
                {icon}
                {children}
            </Button>
        );
    }
}
