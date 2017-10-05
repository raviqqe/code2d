import * as perfectScrollBar from "perfect-scrollbar";
import * as React from "react";

import "./style/ScrollBar.css";

export default class extends React.Component {
    private container: HTMLElement;

    public render() {
        return (
            <div
                ref={(container) => this.container = container}
                style={{ position: "relative" }}
            >
                {this.props.children}
            </div>
        );
    }

    public componentDidMount() {
        perfectScrollBar.initialize(this.container);
    }

    public componentWillUnmount() {
        perfectScrollBar.destroy(this.container);
    }
}
