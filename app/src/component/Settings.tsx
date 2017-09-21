import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/settings";
import SettingsItem from "./SettingsItem";
import "./style/Settings.css";
import Switch from "./Switch";

interface IProps {
    notificationOn: boolean | null;
    onBlur: () => void;
}

class Settings extends React.Component<IProps> {
    public render() {
        const { notificationOn, onBlur } = this.props;

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
                </div>
            </div>
        );
    }
}

export default connect(({ settings }) => settings, actionCreators)(Settings);
