import * as React from "react";
import Markdown = require("react-markdown");

import InputComponent from "./InputComponent";
import "./style/TaskDescription.css";

export default class extends InputComponent {
    public render() {
        if (this.state.editing) {
            return (
                <textarea
                    className="TaskDescription-input"
                    onKeyDown={(event: React.KeyboardEvent<{}>) => {
                        if (event.keyCode === 83 && event.ctrlKey ||
                            event.keyCode === 13 && event.shiftKey) {
                            this.setState({ editing: false });
                            event.preventDefault();
                        }
                    }}
                    {...{ ...this.getFormProps() }}
                />
            );
        }

        const { text } = this.props;

        return (
            <div onClick={() => this.setState({ editing: true })}>
                {text.trim()
                    ? (
                        <Markdown
                            className="TaskDescription-markdown"
                            source={text}
                            renderers={{
                                Link: ({ href, title, children }) =>
                                    <a
                                        href={href}
                                        target="_blank"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        {children}
                                    </a>,
                            }}
                        />
                    )
                    : <div className="TaskDescription-message">No description</div>}
            </div>
        );
    }
}
