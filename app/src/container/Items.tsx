import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./style/Items.css";

interface IProps {
    currentItem: JSX.Element;
    list: JSX.Element;
    menu: JSX.Element;
    signedIn: boolean;
}

class Items extends React.Component<IProps> {
    public render() {
        const { currentItem, list, menu, signedIn } = this.props;

        if (!signedIn) {
            return <Redirect to="/sign-in" />;
        }

        return (
            <div className="Items-container">
                <div className="Items-menu-blank" />
                {menu}
                <div className="Items-main">
                    {list}
                    <div className="Items-current-item-container">{currentItem || <div />}</div>
                </div>
                <div className="Items-blank" />
            </div>
        );
    }
}

export default connect(({ authState }) => authState)(Items);
