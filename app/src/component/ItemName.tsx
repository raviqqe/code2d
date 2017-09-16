import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent from "./InputComponent";
import "./style/ItemName.css";

interface IProps {
    href?: string;
    onEdit?: (text: string) => void;
    text: string;
}

export default class extends InputComponent<IProps> {
    public render() {
        const { href, onEdit, text } = this.props;

        if (this.state.editing) {
            return (
                <input
                    className="ItemName-container"
                    onKeyDown={(event: React.KeyboardEvent<{}>) => {
                        if (event.keyCode === 13) {
                            this.setState({ editing: false });
                            onEdit(this.state.text);
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
                className="ItemName-container"
                onClick={() => this.setState({ editing: this.props.onEdit !== undefined })}
            >
                {href ? <a href={href} target="_blank">{text}</a> : text}
            </div>
        );
    }
}
