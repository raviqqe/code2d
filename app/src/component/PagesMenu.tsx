import * as React from "react";
import { connect } from "react-redux";

import { actionCreators, Page, pages } from "../redux/pages";
import PageButton from "./PageButton";
import "./style/PagesMenu.css";

interface IProps {
    currentPage: Page;
    closed?: boolean;
    setCurrentPage: (page: Page) => void;
}

interface IState {
    opened: boolean;
}

class PagesMenu extends React.Component<IProps, IState> {
    public state: IState = { opened: false };

    public render() {
        const { currentPage, closed, setCurrentPage } = this.props;
        const opened = !closed && this.state.opened;

        return (
            <div className="PagesMenu-container">
                <PageButton
                    className="PagesMenu-current-button"
                    page={currentPage}
                    onClick={() => this.setState({ opened: !this.state.opened })}
                />
                <div
                    className={"PagesMenu-background" + (opened ? "" : "-hidden")}
                    onClick={() => this.setState({ opened: false })}
                />
                <div className={"PagesMenu-box" + (opened ? "" : "-hidden")}>
                    {pages.map((page) =>
                        <PageButton
                            key={page}
                            className={page === currentPage && "PagesMenu-disabled-button"}
                            page={page}
                            onClick={() => {
                                setCurrentPage(page);
                                this.setState({ opened: false });
                            }}
                        />)}
                </div>
            </div>
        );
    }
}

export default connect(({ pages }) => pages, actionCreators)(PagesMenu);
