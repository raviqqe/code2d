import * as perfectScrollBar from "perfect-scrollbar";
import "perfect-scrollbar/dist/css/perfect-scrollbar.css";
import * as React from "react";

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
