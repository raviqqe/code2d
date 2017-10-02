import numeral = require("numeral");
import * as React from "react";
import Square = require("react-icons/lib/md/stop");
import { connect } from "react-redux";

import Button from "../component/Button";
import * as notification from "../lib/notification";
import { ITask } from "../lib/tasks";
import { actionCreators as tasksActionCreators } from "../redux/tasks";
import { actionCreators as timerActionCreators } from "../redux/timer";
import "./style/Timer.css";

const initialSeconds = 25 * 60;

interface IProps {
    currentItem: ITask;
    playAlarm: () => void;
    toggleTimer: () => void;
    updateCurrentItem: (task: ITask) => void;
}

interface IState {
    seconds: number;
}

class Timer extends React.Component<IProps, IState> {
    public state: IState = { seconds: initialSeconds };

    private timer;

    public componentDidMount() {
        this.timer = window.setInterval(
            () => this.setState({ seconds: Math.max(this.state.seconds - 1, 0) }),
            1000);
    }

    public componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    public componentDidUpdate(_, { seconds }: IState) {
        if (seconds !== 0 && this.state.seconds === 0) {
            this.props.playAlarm();
            notification.notify("Timer finished.");
        }
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
                <Button
                    className="Timer-button"
                    onClick={() => {
                        this.saveSpentTime();
                        this.props.toggleTimer();
                    }}
                >
                    <Square />
                </Button>
            </div>
        );
    }

    private saveSpentTime = () => {
        const { currentItem, updateCurrentItem } = this.props;
        const spentSeconds = currentItem.spentSeconds + (initialSeconds - this.state.seconds);

        updateCurrentItem({ ...currentItem, spentSeconds });
    }
}

export default connect(
    ({ tasks, timer }) => ({ ...tasks, ...timer }),
    { ...tasksActionCreators, ...timerActionCreators },
)(Timer);
