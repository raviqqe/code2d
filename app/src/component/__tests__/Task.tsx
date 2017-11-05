import { ITask } from "common/domain/task";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "../../redux";
import Task from "../Task";

const task: ITask = {
    createdAt: 42,
    description: "bar",
    id: "id",
    name: "foo",
    spentSeconds: 42,
    tags: [],
    updatedAt: 42,
};

it("renders a todo task", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <Task {...task} />
        </Provider>,
        document.createElement("div"));
});

it("renders a done task", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <Task {...task} done={true} />
        </Provider>,
        document.createElement("div"));
});

it("renders a detailed todo task", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <Task {...task} detailed={true} />
        </Provider>,
        document.createElement("div"));
});

it("renders a detailed done task", () => {
    ReactDOM.render(
        <Provider store={createStore()}>
            <Task {...task} detailed={true} done={true} />
        </Provider>,
        document.createElement("div"));
});
