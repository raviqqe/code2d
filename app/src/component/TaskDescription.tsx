import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent, { IState } from "./InputComponent";
import "./style/TaskDescription.css";

interface IProps {
    editing?: boolean;
    onBlur: () => void;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent<{}>) => void;
    onEdit: (text: string) => void;
    text: string;
}

export default class extends InputComponent<IProps, IState> {
    public state: IState = { text: "" };

    private textarea: { focus: () => void, value: string };

    public componentDidUpdate({ editing }: IProps) {
        if (!editing && this.props.editing) {
            this.startEditing(this.textarea);
        } else if (editing && !this.props.editing) {
            this.props.onEdit(this.state.text);
        }
    }

    public render() {
        if (this.props.editing) {
            return (
                <textarea
                    className="TaskDescription-input"
                    onBlur={this.props.onBlur}
                    onChange={({ target: { value } }) => this.setState({ text: value })}
                    onKeyDown={this.props.onKeyDown}
                    ref={(textarea) => { this.textarea = textarea; }}
                    value={this.state.text}
                />
            );
        }

        if (this.props.text.trim()) {
            return (
                <div className="TaskDescription-normal" onClick={this.props.onClick}>
                    <Markdown className="TaskDescription-markdown" source={this.props.text} />
                </div>
            );
        }

        return false;
    }
}
