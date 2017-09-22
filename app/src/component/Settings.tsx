import * as React from "react";
import { connect } from "react-redux";

import { actionCreators as authenticationActionCreators } from "../redux/authentication";
import { actionCreators as settingsActionCreators } from "../redux/settings";
import SettingsItem from "./SettingsItem";
import "./style/Settings.css";
import Switch from "./Switch";

interface IProps {
    notificationOn: boolean | null;
    onBlur: () => void;
    signOut: () => void;
}

class Settings extends React.Component<IProps> {
    public render() {
        const { notificationOn, onBlur, signOut } = this.props;

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
                    <div className="Settings-buttons">
                        <button onClick={signOut}>Sign out</button>
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
