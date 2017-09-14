import * as React from "react";

interface IProps {
    text: string;
}

interface IState {
    editing: boolean;
    text: string;
}

export default abstract class InputComponent<P extends IProps> extends React.Component<P, IState> {
    public state: IState = { editing: false, text: "" };

    protected form: { focus: () => void, value: string };
    protected formProps = {
        onBlur: () => this.setState({ editing: false }),
        onChange: ({ target: { value } }) => this.setState({ text: value }),
        ref: (form) => this.form = form,
    };

    public componentDidUpdate(_, { editing }: IState) {
        if (!editing && this.state.editing) {
            this.form.focus(); // Do this after rendering.

            // Set an initial value and move a cursor to end.
            const { text } = this.props;
            this.form.value = "";
            this.form.value = text;
            this.setState({ text });
        }
    }
}
