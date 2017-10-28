import * as React from "react";
import * as ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import config from "../config";

export interface IButtonProps {
    opened: boolean;
    openWindow: () => void;
}

export interface IContentProps {
    closeWindow: () => void;
    opened: boolean;
}

interface IProps {
    buttonComponent: (props: IButtonProps) => JSX.Element;
    buttonProps?: object;
    closed?: boolean;
    contentComponent: (props: IContentProps) => JSX.Element;
    contentProps?: object;
    onOpen?: () => void;
    transitionClassNames?: string | CSSTransition.CSSTransitionClassNames;
}

interface IState {
    opened: boolean;
}

export default class extends React.Component<IProps, IState> {
    public state: IState = { opened: false };
    private modal: HTMLElement | null = null;

    public render() {
        const {
            buttonComponent, buttonProps, closed, contentComponent, contentProps,
            onOpen, transitionClassNames,
        } = this.props;
        const Button = buttonComponent;
        const Content = contentComponent;
        const opened = !closed && this.state.opened;

        return [
            (
                <Button
                    key="button"
                    opened={opened}
                    openWindow={() => this.setState({ opened: true })}
                    {...{ ...(buttonProps || {}) }}
                />
            ),
            !!this.modal && (ReactDOM as any).createPortal(
                <CSSTransition
                    appear={true}
                    classNames={transitionClassNames}
                    in={opened}
                    timeout={config.maxAnimationDelayMs}
                    onEntered={onOpen}
                    onExited={this.removeElement}
                >
                    <Content
                        closeWindow={() => this.setState({ opened: false })}
                        opened={opened}
                        {...{ ...(contentProps || {}) }}
                    />
                </CSSTransition>,
                this.modal),
        ];
    }

    public componentWillUpdate(_, { opened }: IState) {
        if (!this.state.opened && opened) {
            this.createElement();
        }
    }

    public componentDidUpdate({ closed }: IProps) {
        if (!closed && this.props.closed) {
            this.setState({ opened: false });
        }
    }

    public componentWillUnmount() {
        this.removeElement();
    }

    private createElement = (): void => {
        if (!this.modal) {
            this.modal = document.createElement("div");
            document.getElementById(config.rootId).appendChild(this.modal);
        }
    }

    private removeElement = (): void => {
        if (this.modal) {
            this.modal.remove();
            this.modal = null;
        }
    }
}
