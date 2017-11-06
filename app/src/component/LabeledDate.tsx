import * as React from "react";

import SubInformation from "./SubInformation";

function convertToLocaleDate(source: any): string {
    return (new Date(source)).toLocaleDateString();
}

export function formatDate(source: string): string | null {
    const date = convertToLocaleDate(source);

    if (date !== "Invalid Date") {
        return date;
    }

    const timeStamp = parseInt(source, 10) * 1000;

    if (Date.parse("1993-04-30") < timeStamp && timeStamp < Date.now()) {
        return convertToLocaleDate(timeStamp);
    }

    // If source is not too long, it should represent a date.
    if (source.length < 30) {
        return source;
    }

    return null;
}

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
