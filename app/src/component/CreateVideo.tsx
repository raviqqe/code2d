import * as React from "react";
import { connect } from "react-redux";

import { actionCreators } from "../redux/videos";
import CreateItem from "./CreateItem";

interface IProps {
    createItem: (uri: string) => void;
}

interface IState {
    uri: string;
}

class CreateVideo extends React.Component<IProps, IState> {
    public state: IState = { uri: "" };

    public render() {
        const { uri } = this.state;

        return (
            <CreateItem
                createItem={() => {
                    this.props.createItem(uri);
                    this.setState({ uri: "" });
                }}
            >
                <input
                    autoFocus={true}
                    placeholder="YouTube URL"
                    value={uri}
                    onChange={({ target: { value } }) => this.setState({ uri: value })}
                />
            </CreateItem>
        );
    }
}

export default connect(null, actionCreators)(CreateVideo);
