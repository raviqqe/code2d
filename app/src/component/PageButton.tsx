import * as React from "react";
import { connect } from "react-redux";

import { actionCreators, Page } from "../redux/pages";
import "./style/PageButton.css";

interface IProps {
    currentPage: Page;
    icon: JSX.Element;
    page: Page;
    setCurrentPage: (page: Page) => void;
}

class PageButton extends React.Component<IProps> {
    public render() {
        const { children, currentPage, icon, page, setCurrentPage } = this.props;

        return (
            <div
                className={page === currentPage
                    ? "PageButton-container-highlighted"
                    : "PageButton-container"}
            >
                <div onClick={() => setCurrentPage(page)}>
                    <div className="PageButton-icon">{icon}</div> {children}
                </div>
            </div>
        );
    }
}

export default connect(({ pages }) => pages, actionCreators)(PageButton);
