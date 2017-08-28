import * as React from "react";

interface IProps {
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

    public render() {
        return this.state.editing ? (
            <input
                type="text"
                value={this.state.text}
                onChange={({ target: { value } }) => this.setState({ text: value })}
                onKeyPress={({ charCode }) => {
                    if (charCode === 13) {
                        this.setState({ editing: false });
                        this.props.onEdit(this.state.text);
                    }
                }}
            />
        ) : (
                <div
                    onClick={() => this.setState({
                        editing: true,
                        text: this.props.text,
                    })}
                >
                    {this.props.text}
                </div>
            );
    }
}
