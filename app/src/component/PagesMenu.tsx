import * as React from "react";
import { connect } from "react-redux";

import { actionCreators, Page, pages } from "../redux/pages";
import PageButton from "./PageButton";
import "./style/PagesMenu.css";

interface IProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

interface IState {
    showMenu: boolean;
}

class PagesMenu extends React.Component<IProps, IState> {
    public state: IState = { showMenu: false };

    public render() {
        const { currentPage, setCurrentPage } = this.props;
        const { showMenu } = this.state;

        return (
            <div
                className="PagesMenu-container"
                onMouseOver={() => this.setState({ showMenu: true })}
                onMouseOut={() => this.setState({ showMenu: false })}
            >
                <PageButton current={true} page={currentPage} />
                <div className={"PagesMenu-box" + (showMenu ? "" : "-invisible")}>
                    {pages.map((page) => page !== currentPage &&
                        <PageButton
                            key={page}
                            page={page}
                            onClick={() => setCurrentPage(page)}
                        />)}
                </div>
            </div>
        );
    }
}

export default connect(({ pages }) => pages, actionCreators)(PagesMenu);
