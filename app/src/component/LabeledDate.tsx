import * as React from "react";

import "./style/LabeledDate.css";

interface IProps {
    label: string;
    value: any;
}

export default class extends React.Component<IProps> {
    public render() {
        const { label, value } = this.props;

        return (
            <div className="LabeledDate-container">
                {label}: {(new Date(value)).toLocaleDateString()}
            </div>
        );
    }
}
