import * as React from "react";

import CreateItem from "./CreateItem";

interface IProps {
    createItem: (url: string) => void;
    placeholder: string;
}

interface IState {
    url: string;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { url: "" };
    private input: HTMLElement;

    public render() {
        const { createItem, placeholder } = this.props;
        const { url } = this.state;

        return (
            <CreateItem
                createItem={() => {
                    createItem(url);
                    this.setState({ url: "" });
                }}
                focus={() => this.input && this.input.focus()}
            >
                <input
                    ref={(input) => this.input = input}
                    placeholder={placeholder}
                    value={url}
                    onChange={({ target: { value } }) => this.setState({ url: value })}
                />
            </CreateItem>
        );
    }
}
