import * as React from "react";
import { connect } from "react-redux";

import { actionCreators, Page } from "../redux/pages";
import "./style/PagesMenuButton.css";

interface IProps {
    currentPage: Page;
    icon: JSX.Element;
    page: Page;
    setCurrentPage: (page: Page) => void;
}

class PagesMenuButton extends React.Component<IProps> {
    public render() {
        const { children, currentPage, icon, page, setCurrentPage } = this.props;

        return (
            <div
                className={page === currentPage
                    ? "PagesMenuButton-container-highlighted"
                    : "PagesMenuButton-container"}
            >
                <div onClick={() => setCurrentPage(page)}>
                    <div className="PagesMenuButton-icon">{icon}</div> {children}
                </div>
            </div>
        );
    }
}

export default connect(({ pages }) => pages, actionCreators)(PagesMenuButton);
