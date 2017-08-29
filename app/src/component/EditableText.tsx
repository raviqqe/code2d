import * as React from "react";

interface IProps {
    className?: string;
    inputClassName?: string;
    editable?: boolean;
    onEdit: (text: string) => void;
    text: string;
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

    public edit = (): void => {
        if (this.props.editable || this.props.editable === undefined) {
            this.setState({ editing: true });
        }
    }

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
        return this.state.editing ? (
            <input
                className={this.props.inputClassName}
                ref={(input) => { this.input = input; }}
                type="text"
                value={this.state.text}
                onBlur={() => this.setState({ editing: false })}
                onChange={({ target: { value } }) => this.setState({ text: value })}
                onKeyPress={({ charCode }) => {
                    if (charCode === 13) {
                        this.setState({ editing: false });
                        this.props.onEdit(this.state.text);
                    }
                }}
            />
        ) : (
                <div className={this.props.className} onClick={this.edit}>
                    {this.props.text}
                </div>
            );
    }
}
