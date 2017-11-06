import { ITask } from "common/domain/task";
import numeral = require("numeral");
import * as React from "react";
import Square = require("react-icons/lib/md/stop");
import { connect } from "react-redux";

import Button from "../component/Button";
import * as notification from "../infra/notification";
import { actionCreators as tasksActionCreators } from "../redux/tasks";
import { actionCreators as timerActionCreators } from "../redux/timer";
import "./style/Timer.css";

const workSeconds = 25 * 60;
const restSeconds = 5 * 60;

interface IProps {
    currentItem: ITask;
    playAlarm: () => void;
    toggleTimer: () => void;
    updateCurrentItem: (task: ITask) => void;
}

interface IState {
    rest: boolean;
    seconds: number;
}

class Timer extends React.Component<IProps, IState> {
    public state: IState = { rest: false, seconds: workSeconds };

    private timer;

    public componentDidMount() {
        this.timer = setInterval(
            () => this.setState({ seconds: Math.max(this.state.seconds - 1, 0) }),
            1000);
    }

    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    public componentDidUpdate(_, { seconds }: IState) {
        if (seconds !== 0 && this.state.seconds === 0) {
            this.props.playAlarm();
            notification.notify(this.state.rest ? "Break finished." : "1 pomodoro finished.");

            if (!this.state.rest) {
                this.saveSpentTime();
                this.setState({ rest: true, seconds: restSeconds });
            }
        }
    }

    public render() {
        const { toggleTimer } = this.props;
        const { rest, seconds } = this.state;
        const postfix = rest ? "-rest" : "";

        return (
            <div className={"Timer-container" + postfix}>
                <div className={"Timer-time" + postfix}>
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
                        if (!rest) {
                            this.saveSpentTime();
                        }

                        toggleTimer();
                    }}
                >
                    <Square />
                </Button>
            </div>
        );
    }

    private saveSpentTime = () => {
        const { currentItem, updateCurrentItem } = this.props;

        updateCurrentItem({
            ...currentItem,
            spentSeconds: currentItem.spentSeconds + workSeconds - this.state.seconds,
        });
    }
}

export default connect(
    ({ tasks, timer }) => ({ ...tasks, ...timer }),
    { ...tasksActionCreators, ...timerActionCreators },
)(Timer);
