import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent from "./InputComponent";
import "./style/TaskDescription.css";

interface IProps {
    editable: boolean;
    onEdit: (text: string) => void;
    text: string;
}

export default class extends InputComponent<IProps> {
    public render() {
        if (this.state.editing) {
            return (
                <textarea
                    className="TaskDescription-input"
                    onKeyDown={({ keyCode, shiftKey }) => {
                        if (keyCode === 13 && shiftKey) {
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
                className="TaskDescription-normal"
                onClick={() => this.setState({ editing: this.props.editable })}
            >
                {this.props.text.trim()
                    ? <Markdown className="TaskDescription-markdown" source={this.props.text} />
                    : <div className="TaskDescription-message">No description</div>}
            </div>
        );
    }
}
