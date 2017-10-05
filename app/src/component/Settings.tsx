import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import { connect } from "react-redux";

import { actionCreators as authenticationActionCreators } from "../redux/authentication";
import { actionCreators as settingsActionCreators } from "../redux/settings";
import Button from "./Button";
import Link from "./Link";
import ScrollBar from "./ScrollBar";
import SettingsItem from "./SettingsItem";
import "./style/Settings.css";

const grey = "#bcc";
const green = "#9db634";

interface IProps {
    alarmVolume: number;
    deleteAccount: () => void;
    hidden: boolean;
    notificationOn: boolean | null;
    onBlur: () => void;
    setAlarmVolume: () => void;
    signOut: () => void;
}

class Settings extends React.Component<IProps> {
    public render() {
        const { alarmVolume, deleteAccount, hidden, notificationOn, onBlur, setAlarmVolume, signOut }
            = this.props;

        return (
            <div className={"Settings-container" + (hidden ? "-hidden" : "")} onClick={onBlur}>
                <ScrollBar>
                    <div className="Settings-box" onClick={(event) => event.stopPropagation()}>
                        <SettingsItem
                            label="Notification"
                            value={notificationOn
                                ? <div className="Settings-notification-enabled">enabled</div>
                                : <div className="Settings-notification-disabled">disabled</div>
                            }
                        />
                        <SettingsItem
                            label="Alarm volume"
                            value={
                                <div className="Settings-volume-slider">
                                    <Slider
                                        min={0}
                                        max={1}
                                        defaultValue={alarmVolume}
                                        value={alarmVolume}
                                        step={0.125}
                                        marks={{ 0: "0", 0.5: "0.5", 1: "1" }}
                                        railStyle={{ backgroundColor: grey }}
                                        trackStyle={{ backgroundColor: green }}
                                        dotStyle={{ borderColor: grey }}
                                        activeDotStyle={{ borderColor: green }}
                                        handleStyle={{ borderColor: green, boxShadow: "none" }}
                                        onChange={setAlarmVolume}
                                    />
                                </div>
                            }
                        />
                        <div className="Settings-buttons">
                            <Button onClick={signOut}>Sign out</Button>
                            <Button className="Settings-negative-button" onClick={deleteAccount}>
                                Delete account
                            </Button>
                        </div>
                        <div className="Settings-footer">
                            <Link href={process.env.REACT_APP_FEEDBACK_URL}>Feedback</Link>
                            <Link href={process.env.REACT_APP_REPOSITORY_URL}>GitHub</Link>
                            <Link href="/terms_of_use.pdf">Terms of Use</Link>
                            <Link href="/privacy_policy.pdf">Privacy Policy</Link>
                        </div>
                    </div>
                </ScrollBar>
            </div>
        );
    }
}

export default connect(
    ({ settings }) => settings,
    { ...authenticationActionCreators, ...settingsActionCreators },
)(Settings);
