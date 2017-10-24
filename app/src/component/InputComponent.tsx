import * as React from "react";

export interface IProps {
    onEdit?: (text: string) => void;
    text: string;
}

export interface IState {
    editing: boolean;
    text: string;
}

export default abstract class InputComponent<P extends IProps = IProps> extends React.Component<P, IState> {
    public state: IState = { editing: false, text: "" };

    protected form: { focus: () => void, value: string };

    public componentDidUpdate(_, { editing }: IState) {
        const { onEdit } = this.props;

        if (!editing && this.state.editing) {
            this.form.focus(); // Do this after rendering.

            // Set an initial value and move a cursor to end.
            const { text } = this.props;
            this.form.value = "";
            this.form.value = text;
            this.setState({ text });
        } else if (editing && !this.state.editing && onEdit) {
            onEdit(this.state.text);
        }
    }

    protected getFormProps = () => ({
        onBlur: () => this.setState({ editing: false }),
        onChange: ({ target: { value } }) => this.setState({ text: value }),
        ref: (form) => this.form = form,
        value: this.state.text,
    })
}
