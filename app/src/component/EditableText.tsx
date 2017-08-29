import * as React from "react";
import Markdown = require("react-markdown");

import "./style/EditableText.css";

interface IProps {
    className?: string;
    inputClassName?: string;
    editable?: boolean;
    onEdit: (text: string) => void;
    text: string;
    textArea?: boolean;
}

interface IState {
    editing: boolean;
    text: string;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = {
        editing: false,
        text: "",
    };

    private input: { focus: () => void, value: string };

    public startEditing = (): void => {
        if (this.props.editable || this.props.editable === undefined) {
            this.setState({ editing: true });
        }
    }

    public stopEditing = (): void => {
        this.setState({ editing: false });
        this.props.onEdit(this.state.text);
    }

    public cancelEditing = (): void => this.setState({ editing: false });

    public componentDidUpdate(_, { editing }: IState) {
        if (!editing && this.state.editing) {
            this.input.focus(); // Do this after rendering.

            // Set an initial value and move a cursor to end.
            this.input.value = "";
            this.input.value = this.props.text;
            this.setState({ text: this.props.text });
        }
    }

    public render() {
        if (!this.state.editing && this.props.text.trim()) {
            return (
                <div
                    className={this.props.className}
                    onClick={this.props.textArea ? undefined : this.startEditing}
                >
                    {this.props.textArea
                        ? <Markdown className="EditableText-markdown" source={this.props.text} />
                        : this.props.text}
                </div>
            );
        } else if (!this.state.editing) {
            return false;
        }

        const commonProps = {
            className: this.props.inputClassName,
            onChange: ({ target: { value } }) => this.setState({ text: value }),
            ref: (input) => { this.input = input; },
            value: this.state.text,
        };

        return this.props.textArea
            ? <textarea {...commonProps} />
            : (
                <input
                    {...commonProps}
                    onBlur={this.cancelEditing}
                    onKeyPress={({ charCode }) => {
                        if (charCode === 13) {
                            this.stopEditing();
                            this.props.onEdit(this.state.text);
                        }
                    }}
                />
            );
    }
}
