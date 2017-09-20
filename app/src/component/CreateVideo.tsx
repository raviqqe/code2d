import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/videos";
import CreateItem from "./CreateItem";

interface IProps {
    createItem: (url: string) => void;
}

interface IState {
    url: string;
}

class CreateVideo extends React.Component<IProps, IState> {
    public state: IState = { url: "" };

    public render() {
        const { url } = this.state;

        return (
            <CreateItem
                createItem={() => {
                    this.props.createItem(url);
                    this.setState({ url: "" });
                }}
            >
                <input
                    autoFocus={true}
                    placeholder="YouTube URL"
                    value={url}
                    onChange={({ target: { value } }) => this.setState({ url: value })}
                />
            </CreateItem>
        );
    }
}

export default connect(null, actionCreators)(CreateVideo);
