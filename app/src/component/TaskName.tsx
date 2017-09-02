import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent from "./InputComponent";
import "./style/TaskName.css";

interface IProps {
    editable?: boolean;
    onEdit: (text: string) => void;
    text: string;
}

export default class extends InputComponent<IProps> {
    public render() {
        if (this.state.editing) {
            return (
                <input
                    className="TaskName-container"
                    onKeyDown={(event: React.KeyboardEvent<{}>) => {
                        if (event.keyCode === 13) {
                            this.setState({ editing: false });
                            this.props.onEdit(this.state.text);
                            event.preventDefault();
                        }
                    }}
                    value={this.state.text}
                    {...this.formProps}
                />
            );
        }

        return (
            <div
                className="TaskName-container"
                onClick={() => this.setState({ editing: this.props.editable })}
            >
                {this.props.text}
            </div>
        );
    }
}
