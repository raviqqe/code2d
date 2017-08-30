import * as React from "react";

export interface IProps {
    text: string;
}

export interface IState {
    text: string;
}

export default abstract class InputComponent<P extends IProps, S extends IState> extends React.Component<P, S> {
    protected startEditing(ref: { focus: () => void, value: string }) {
        ref.focus(); // Do this after rendering.

        // Set an initial value and move a cursor to end.
        ref.value = "";
        ref.value = this.props.text;
        this.setState({ text: this.props.text });
    }
}
