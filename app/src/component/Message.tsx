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
        const { error, message } = this.props;

        return (
            <div className="Message-container" style={message === "" ? { display: "none" } : {}}>
                <div className={error ? "Message-box-error" : "Message-box"}>
                    {message}
                </div>
            </div>
        );
    }
}

export default connect(({ message }) => message, actionCreators)(Message);
