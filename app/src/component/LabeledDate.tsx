import * as React from "react";

import SubInformation from "./SubInformation";

interface IProps {
    label: string;
    value: any;
}

export default class extends React.Component<IProps> {
    public render() {
        const { label, value } = this.props;

        return (
            <SubInformation>
                {label}: {(new Date(value)).toLocaleDateString()}
            </SubInformation>
        );
    }
}
