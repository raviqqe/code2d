import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent, { IState as IInputComponentState } from "./InputComponent";

interface IProps {
    className?: string;
    inputClassName?: string;
    editable?: boolean;
    onEdit: (text: string) => void;
    text: string;
}

interface IState extends IInputComponentState {
    editing: boolean;
}

export default class extends InputComponent<IProps, IState> {
    public state: IState = { editing: false, text: "" };

    private input: { focus: () => void, value: string };

    public componentDidUpdate(_, { editing }: IState) {
        if (!editing && this.state.editing) {
            this.startEditing(this.input);
        }
    }

    public render() {
        if (this.props.editable && this.state.editing) {
            return (
                <input
                    className={this.props.inputClassName}
                    onBlur={() => this.setState({ editing: false })}
                    onChange={({ target: { value } }) => this.setState({ text: value })}
                    onKeyPress={({ charCode }) => {
                        if (charCode === 13) {
                            this.setState({ editing: false });
                            this.props.onEdit(this.state.text);
                        }
                    }}
                    ref={(input) => { this.input = input; }}
                    value={this.state.text}
                />
            );
        }

        return (
            <div
                className={this.props.className}
                onClick={() => this.setState({ editing: this.props.editable })}
            >
                {this.props.text}
            </div>
        );
    }
}