import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import * as React from "react";
import { connect } from "react-redux";

import { actionCreators as authenticationActionCreators } from "../redux/authentication";
import { actionCreators as settingsActionCreators } from "../redux/settings";
import SettingsItem from "./SettingsItem";
import "./style/Settings.css";
import Switch from "./Switch";

const grey = "#bcc";
const green = "#9db634";

interface IProps {
    deleteAccount: () => void;
    notificationOn: boolean | null;
    onBlur: () => void;
    signOut: () => void;
}

class Settings extends React.Component<IProps> {
    public render() {
        const { deleteAccount, notificationOn, onBlur, signOut } = this.props;

        return (
            <div className="Settings-container" onClick={onBlur}>
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
                                    defaultValue={1}
                                    step={0.125}
                                    marks={{ 0: "0", 0.5: "0.5", 1: "1" }}
                                    railStyle={{ backgroundColor: grey }}
                                    trackStyle={{ backgroundColor: green }}
                                    dotStyle={{ borderColor: grey }}
                                    activeDotStyle={{ borderColor: green }}
                                    handleStyle={{ borderColor: green, boxShadow: "none" }}
                                />
                            </div>
                        }
                    />
                    <div className="Settings-buttons">
                        <button onClick={signOut}>Sign out</button>
                        <button className="Settings-negative-button" onClick={deleteAccount}>
                            Delete account
                        </button>
                    </div>
                    <div className="Settings-footer">
                        <a href={process.env.REACT_APP_FEEDBACK_URL} target="_blank">Feedback</a>
                        <a href={process.env.REACT_APP_REPOSITORY_URL} target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    ({ settings }) => settings,
    { ...authenticationActionCreators, ...settingsActionCreators },
)(Settings);
