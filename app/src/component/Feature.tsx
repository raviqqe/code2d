import * as React from "react";

import "./style/Feature.css";

interface IProps {
    image: string;
    title: string | JSX.Element;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, image, title } = this.props;

        return (
            <div className="Feature-container">
                <img className="Feature-image" src={image} />
                <div className="Feature-title">{title}</div>
                <div className="Feature-description">{children}</div>
            </div>
        );
    }
}
