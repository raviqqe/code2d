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
            <div className="PagesMenu-container">
                <PageButton
                    current={true}
                    page={currentPage}
                    onClick={() => this.setState({ showMenu: true })}
                />
                <div
                    className="PagesMenu-box-background"
                    style={showMenu ? {} : { display: "none" }}
                    onClick={() => this.setState({ showMenu: false })}
                />
                <div
                    className={"PagesMenu-box" + (showMenu ? "" : "-invisible")}
                    onClick={(event) => event.stopPropagation()}
                >
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
