import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import Gear = require("react-icons/lib/md/settings");
import { connect } from "react-redux";

import config from "../config";
import { actionCreators as authenticationActionCreators } from "../redux/authentication";
import { actionCreators as settingsActionCreators } from "../redux/settings";
import Button from "./Button";
import Link from "./Link";
import Modal from "./Modal";
import SettingsItem from "./SettingsItem";
import "./style/Settings.css";

const grey = "#bcc";
const green = "#9db634";

interface IProps {
    alarmVolume: number;
    deleteAccount: () => void;
    notificationOn: boolean | null;
    setAlarmVolume: () => void;
    signOut: () => void;
}

class Settings extends React.Component<IProps> {
    public render() {
        const { alarmVolume, deleteAccount, notificationOn, setAlarmVolume, signOut } = this.props;

        return (
            <Modal
                button={
                    ({ shown, showWindow }) =>
                        <div
                            className={"Settings-icon" + (shown ? "-active" : "")}
                            onClick={showWindow}
                        >
                            <Gear />
                        </div>}
            >
                <div className="Settings-container">
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
                                    defaultValue={0.5}
                                    value={alarmVolume}
                                    step={0.125}
                                    marks={{ 0: "0", 0.5: "0.5", 1: "1" }}
                                    railStyle={{ backgroundColor: grey }}
                                    trackStyle={{ backgroundColor: green }}
                                    dotStyle={{ background: grey, borderColor: grey }}
                                    activeDotStyle={{ background: green, borderColor: green }}
                                    handleStyle={{
                                        background: green,
                                        borderColor: green,
                                        boxShadow: "none",
                                    }}
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
                        <Link href={config.feedbackUrl}>Feedback</Link>
                        <Link href={config.repositoryUrl}>GitHub</Link>
                        <Link href="/terms_of_use.pdf">Terms of Use</Link>
                        <Link href="/privacy_policy.pdf">Privacy Policy</Link>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect(
    ({ settings }) => settings,
    { ...authenticationActionCreators, ...settingsActionCreators },
)(Settings);
