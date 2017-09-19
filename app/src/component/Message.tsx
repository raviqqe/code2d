import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/message";
import "./style/Message.css";

interface IProps {
    error: boolean;
    message: string;
}

class Message extends React.Component<IProps> {
    public render() {
        return (
            <div className="Message-container">
                <div className={this.boxClassName}>
                    {this.props.message}
                </div>
            </div>
        );
    }

    private get boxClassName(): string {
        const { error, message } = this.props;
        return "Message-box" + (error ? "-error" : "") + (message ? "" : "-hidden");
    }
}

export default connect(({ message }) => message, actionCreators)(Message);
