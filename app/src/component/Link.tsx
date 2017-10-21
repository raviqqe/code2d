import * as React from "react";

import "./style/Link.css";

interface IProps {
    href: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, href } = this.props;

        return (
            <a
                className="Link-container"
                href={href}
                onClick={(event) => event.stopPropagation()}
                target="_blank"
            >
                {children}
            </a>
        );
    }
}
