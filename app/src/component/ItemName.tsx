import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent, { IProps as IInputComponentProps } from "./InputComponent";
import Link from "./Link";
import "./style/ItemName.css";

interface IProps extends IInputComponentProps {
    highlighted?: boolean;
    href?: string;
    icon?: string;
}

export default class extends InputComponent<IProps> {
    public render() {
        const { highlighted, href, icon, onEdit, text } = this.props;

        if (this.state.editing) {
            return (
                <input
                    className="ItemName-container"
                    onKeyDown={(event: React.KeyboardEvent<{}>) => {
                        if (event.keyCode === 13) {
                            this.setState({ editing: false });
                            event.preventDefault();
                        }
                    }}
                    {...{ ...this.getFormProps() }}
                />
            );
        }

        return (
            <div
                className={"ItemName-container" + (highlighted ? "-highlighted" : "")}
                onClick={() => this.setState({ editing: this.props.onEdit !== undefined })}
            >
                {icon && <img className="ItemName-icon" src={icon} />}
                {href ? <Link href={href}>{text}</Link> : text}
            </div>
        );
    }
}
