import * as React from "react";
import { connect } from "react-redux";

import { INewTask } from "../lib/tasks";
import { actionCreators } from "../redux/tasks";
import CreateItem from "./CreateItem";
import "./style/CreateTask.css";

interface IProps {
    createItem: (task: INewTask) => void;
    startCreatingItem: () => void;
    stopCreatingItem: () => void;
}

interface IState {
    description: string;
    name: string;
}

class CreateTask extends React.Component<IProps, IState> {
    public state: IState = { description: "", name: "" };

    public render() {
        const { description, name } = this.state;

        return (
            <CreateItem
                createItem={() => {
                    this.props.createItem({ description, name, tags: [] });
                    this.setState({ description: "", name: "" });
                }}
                onChangeState={(creatingTask) => creatingTask
                    ? this.props.startCreatingItem()
                    : this.props.stopCreatingItem()}
            >
                <input
                    autoFocus={true}
                    placeholder="Name"
                    value={name}
                    onChange={({ target: { value } }) => this.setState({ name: value })}
                />
                <textarea
                    className="CreateTask-description"
                    placeholder="Description"
                    value={description}
                    onChange={({ target: { value } }) => this.setState({ description: value })}
                />
                <div className="CreateTask-buttons">
                    <button className="CreateTask-button" type="submit">Create</button>
                    <button className="CreateTask-cancel-button" type="reset">Cancel</button>
                </div>
            </CreateItem>
        );
    }
}

export default connect(null, actionCreators)(CreateTask);
