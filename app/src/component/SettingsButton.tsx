import * as React from "react";
import Gear = require("react-icons/lib/md/settings");

import Settings from "./Settings";
import "./style/SettingsButton.css";

interface IState {
    on: boolean;
}

export default class extends React.Component<{}, IState> {
    public state: IState = { on: false };

    public render() {
        const { on } = this.state;

        return (
            <div>
                <div
                    className={"SettingsButton-icon" + (on ? "-active" : "")}
                    onClick={() => this.setState({ on: true })}
                >
                    <Gear />
                </div>
                <div style={on ? {} : { display: "none" }}>
                    <Settings onBlur={() => this.setState({ on: false })} />
                </div>
            </div>
        );
    }
}
