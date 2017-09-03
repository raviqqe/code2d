import numeral = require("numeral");
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { playHorn } from "../lib/audio";
import { ITask } from "../lib/tasks";
import { actionCreators as tasksActionCreators } from "../redux/tasks";
import { actionCreators as timerActionCreators } from "../redux/timer";
import "./style/Timer.css";

const initialSeconds = 25 * 60;

interface IProps {
    currentTask: ITask;
    setTodoTask: (oldTask: ITask, newTask: ITask) => void;
    toggleTimer: () => void;
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
            playHorn();
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
                <button
                    className="Timer-button"
                    onClick={() => {
                        this.saveSpentTime();
                        this.props.toggleTimer();
                    }}
                >
                    <Link to="/tasks/todo">stop</Link>
                </button>
            </div>
        );
    }

    private saveSpentTime = () => {
        const { currentTask, setTodoTask } = this.props;
        const spentSeconds = currentTask.spentSeconds + (initialSeconds - this.state.seconds);

        setTodoTask(currentTask, { ...currentTask, spentSeconds });
    }
}

export default connect(
    ({ tasks, timer }) => ({ ...tasks, ...timer }),
    { ...tasksActionCreators, ...timerActionCreators },
)(Timer);
