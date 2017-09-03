import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { actionCreators } from "../redux/timer";
import "./style/Timer.css";

interface IProps {
    toggleTimer: () => void;
}

interface IState {
    paused: boolean;
    seconds: number;
}

class Timer extends React.Component<IProps, IState> {
    public state: IState = { paused: false, seconds: 25 * 60 };

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

    public render() {
        const { paused, seconds } = this.state;

        return (
            <div className="Timer-container">
                {Math.floor(seconds / 60)} {seconds % 60}
                <button onClick={() => this.setState({ paused: !paused })}>
                    {paused ? "restart" : "pause"}
                </button>
                <div onClick={this.props.toggleTimer}>
                    <Link to="/tasks/todo">cancel</Link>
                </div>
            </div>
        );
    }
}

export default connect(({ timer }) => timer, actionCreators)(Timer);
