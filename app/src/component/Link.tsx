import * as React from "react";

import "./style/Link.css";

interface IProps {
    colored?: boolean;
    href: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, colored, href } = this.props;

        return (
            <a
                className={"Link-container" + (colored ? "-colored" : "")}
                href={href}
                onClick={(event) => event.stopPropagation()}
                target="_blank"
            >
                {children}
            </a>
        );
    }
}
