import * as React from "react";
import Plus = require("react-icons/lib/md/add");

import Button from "./Button";
import Modal from "./Modal";
import "./style/CreateItem.css";

interface IProps {
    createItem: () => void;
    focus?: () => void;
}

export default class extends React.Component<IProps> {
    public render() {
        const { children, createItem, focus } = this.props;

        return (
            <Modal
                button={({ openWindow }) =>
                    <Button
                        className="CreateItem-button"
                        onClick={openWindow}
                    >
                        <Plus /><div>new</div>
                    </Button>}
                onOpen={focus}
            >
                {(closeWindow) =>
                    <form
                        className="CreateItem-form"
                        onSubmit={(event) => {
                            createItem();
                            closeWindow();
                            event.preventDefault();
                        }}
                        onReset={(event) => {
                            closeWindow();
                            event.preventDefault();
                        }}
                    >
                        {children}
                    </form>}
            </Modal>
        );
    }
}
