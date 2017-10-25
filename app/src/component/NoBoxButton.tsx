import * as React from "react";

import "./style/NoBoxButton.css";

interface IProps {
    className?: string;
    icon: JSX.Element;
    onClick: () => void;
}

export default class PageButton extends React.Component<IProps> {
    public render() {
        const { children, className, icon, onClick } = this.props;

        return (
            <button className={className || "NoBoxButton-container"} onClick={onClick}>
                {icon}
                {children}
            </button>
        );
    }
}
