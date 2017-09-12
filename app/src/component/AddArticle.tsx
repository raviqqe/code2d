import * as React from "react";
import Plus = require("react-icons/lib/md/add");
import { connect } from "react-redux";

import { IArticle } from "../lib/articles";
import { actionCreators } from "../redux/articles";

interface IProps {
    addArticle: (uri: string) => void;
}

interface IState {
    addingArticle: boolean;
    uri: string;
}

class AddArticle extends React.Component<IProps, IState> {
    public state: IState = { addingArticle: false, uri: "" };

    private input: { focus: () => void };

    public componentDidUpdate(_, { addingArticle }: IState) {
        if (!addingArticle && this.state.addingArticle) {
            this.input.focus(); // Do this after rendering.
        }
    }

    public render() {
        const { addingArticle, uri } = this.state;

        if (addingArticle) {
            return (
                <form
                    className="AddArticle-input"
                    onSubmit={(event) => {
                        this.props.addArticle(uri);
                        this.setState({ addingArticle: false, uri: "" });
                        event.preventDefault();
                    }}
                >
                    <input
                        ref={(input) => this.input = input}
                        placeholder="Page URL"
                        value={uri}
                        onBlur={() => this.setState({ addingArticle: false, uri: "" })}
                        onChange={({ target: { value } }) => this.setState({ uri: value })}
                    />
                </form>
            );
        }

        return (
            <button
                className="AddArticle-button"
                onClick={() => this.setState({ addingArticle: true })}
            >
                <Plus />
            </button>
        );
    }
}

export default connect(({ articles }) => articles, actionCreators)(AddArticle);
