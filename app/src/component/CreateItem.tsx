import * as React from "react";
import Plus = require("react-icons/lib/md/add");

import IconedButton from "./IconedButton";
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
                buttonComponent={({ openWindow }) =>
                    <IconedButton icon={<Plus />} onClick={openWindow}>
                        <div className="CreateItem-button-text">new</div>
                    </IconedButton>}
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
