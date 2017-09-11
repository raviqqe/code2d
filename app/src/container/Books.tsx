import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./style/Books.css";

interface IProps {
    signedIn: boolean;
}

class Books extends React.Component<IProps> {
    public render() {
        if (!this.props.signedIn) {
            return <Redirect to="/sign-in" />;
        }

        return (
            <div className="Books-container">
                No book is available.
            </div>
        );
    }
}

export default connect(
    ({ authState, books }) => ({ ...authState, ...books }),
    {},
)(Books);
