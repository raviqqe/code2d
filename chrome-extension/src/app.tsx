import * as React from "react";

const config = require("../config.json");

const commonStyle = {
    background: "white",
    borderRadius: "0.5em",
    boxShadow: "0.5em 0.5em 1em rgba(0, 0, 0, 0.5)",
    position: "fixed" as "fixed",
    right: "1em",
    top: "1em",
    transition: "visibility 0.1s, transform: 0.1s",
    zIndex: 2049,
};

const hiddenStyle = {
    ...commonStyle,
    transform: "translateY(-200%)",
    visibility: "hidden",
};

const visibleStyle = {
    ...commonStyle,
    transform: "translateY(0)",
    visibility: "visible",
};

interface IState {
    hidden: boolean;
    message: string;
}

export default class extends React.Component<{}, IState> {
    public state: IState = { hidden: true, message: "" };

    public render() {
        const { hidden, message } = this.state;

        return (
            <div style={hidden ? hiddenStyle : visibleStyle}>
                {message}
            </div>
        );
    }

    public componentDidMount() {
        chrome.runtime.onMessage.addListener(async () => {
            this.setState({ hidden: false, message: "Adding an item..." });

            try {
                await this.addItem();
                this.setState({ message: "An item added." });
            } catch (error) {
                console.error(error);
                this.setState({ message: "Couldn't add an item." });
            }

            setTimeout(() => this.setState({ hidden: true }), 5000);
        });
    }

    private addItem = async (): Promise<void> => {
        await new Promise((resolve, reject) => chrome.runtime.sendMessage(
            chrome.runtime.id,
            { url: window.location.href },
            undefined,
            (error: Error) => error ? reject(error) : resolve()));
    }
}
