import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/message";
import "./style/Message.css";

interface IProps {
    error: boolean;
    message: string;
}

// Keep previous messages until they go away from screens.
interface IState {
    message: string;
}

class Message extends React.Component<IProps, IState> {
    public state: IState = { message: "" };

    public render() {
        return (
            <div className="Message-container">
                <div className={this.boxClassName}>
                    {this.state.message}
                </div>
            </div>
        );
    }

    public componentWillUpdate({ message }) {
        if (message && message !== this.state.message) {
            this.setState({ message });
        }
    }

    private get boxClassName(): string {
        const { error, message } = this.props;
        return "Message-box" + (error ? "-error" : "") + (message ? "" : "-hidden");
    }
}

export default connect(({ message }) => message, actionCreators)(Message);
