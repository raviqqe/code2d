import * as React from "react";

import "./style/Switch.css";

interface IProps {
    on: boolean;
    onClick: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { on, onClick } = this.props;

        return (
            <button
                className={on ? "Switch-button-on" : "Switch-button-off"}
                onClick={(event) => {
                    onClick();
                    event.preventDefault();
                    event.stopPropagation();
                }}
            />
        );
    }
}
