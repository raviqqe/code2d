import * as React from "react";

import "./style/SubInformation.css";

export default class extends React.Component {
    public render() {
        return <div className="SubInformation-container">{this.props.children}</div>;
    }
}
