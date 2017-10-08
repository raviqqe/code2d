import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent from "./InputComponent";
import Link from "./Link";
import "./style/ItemName.css";

interface IProps {
    highlighted?: boolean;
    href?: string;
    onEdit?: (text: string) => void;
    text: string;
}

export default class extends InputComponent<IProps> {
    public render() {
        const { highlighted, href, onEdit, text } = this.props;

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
                className={"ItemName-container" + (highlighted ? "-highlighted" : "")}
                onClick={() => this.setState({ editing: this.props.onEdit !== undefined })}
            >
                {href ? <Link href={href}>{text}</Link> : text}
            </div>
        );
    }
}
