import * as React from "react";

export interface IProps {
    text: string;
}

export interface IState {
    editing: boolean;
    text: string;
}

export default abstract class InputComponent<P extends IProps> extends React.Component<P, IState> {
    public state: IState = {
        editing: false,
        text: "",
    };

    protected input: { focus: () => void, value: string };

    public componentDidUpdate(_, { editing }: IState) {
        if (!editing && this.state.editing) {
            this.input.focus(); // Do this after rendering.

            // Set an initial value and move a cursor to end.
            this.input.value = "";
            this.input.value = this.props.text;
            this.setState({ text: this.props.text });
        }
    }
}
