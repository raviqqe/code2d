import * as React from "react";

import { formatDate } from "../lib/utils";
import SubInformation from "./SubInformation";

interface IProps {
    label: string;
    value: any;
}

export default class extends React.Component<IProps> {
    public render() {
        const { label, value } = this.props;
        const date = formatDate(value);

        if (!date) {
            return false;
        }

        return <SubInformation>{label}: {date}</SubInformation>;
    }
}
