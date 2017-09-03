import * as React from "react";
import { Link } from "react-router-dom";

import "./style/Timer.css";

interface IProps {
    on: boolean;
}

interface IState {
    paused: boolean;
    seconds: number;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { paused: false, seconds: 0 };

    private timer;

    public componentDidMount() {
        this.timer = window.setInterval(
            () => {
                if (!this.state.paused) {
                    this.setState({ seconds: Math.max(this.state.seconds - 1, 0) });
                }
            },
            1000);
    }

    public componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    public componentDidUpdate({ on }: IProps) {
        if (!on && this.props.on) {
            this.setState({ paused: false, seconds: 25 * 60 });
        }
    }

    public render() {
        const { paused } = this.state;

        return (
            <div className="Timer-container">
                {Math.floor(this.state.seconds / 60)} {this.state.seconds % 60}
                <button onClick={() => this.setState({ paused: !paused })}>
                    {paused ? "restart" : "pause"}
                </button>
                <Link to="/tasks/todo">cancel</Link>
            </div>
        );
    }
}
