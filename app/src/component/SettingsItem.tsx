import * as React from "react";

import "./style/SettingsItem.css";

interface IProps {
    label: string;
    value: JSX.Element;
}

export default class extends React.Component<IProps> {
    public render() {
        const { label, value } = this.props;

        return (
            <div className="SettingsItem-container">
                {label}
                {value}
            </div>
        );
    }
}
