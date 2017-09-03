import numeral = require("numeral");
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { actionCreators } from "../redux/timer";
import "./style/Timer.css";

interface IState {
    seconds: number;
}

class Timer extends React.Component<{ toggleTimer: () => void }, IState> {
    public state: IState = { seconds: 25 * 60 };

    private timer;

    public componentDidMount() {
        this.timer = window.setInterval(
            () => this.setState({ seconds: Math.max(this.state.seconds - 1, 0) }),
            1000);
    }

    public render() {
        const { seconds } = this.state;

        return (
            <div className="Timer-container">
                <div className="Timer-time">
                    <div className="Timer-minutes">
                        {Math.floor(seconds / 60)}
                    </div>
                    <div className="Timer-seconds">
                        {numeral(seconds % 60).format("00")}
                    </div>
                </div>
                <button className="Timer-button" onClick={this.props.toggleTimer}>
                    <Link to="/tasks/todo">cancel</Link>
                </button>
            </div>
        );
    }
}

export default connect(({ timer }) => timer, actionCreators)(Timer);
