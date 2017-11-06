import { mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";

import createStore from "../../redux";
import { actionCreators } from "../../redux/tasks";
import { dispatch } from "../../redux/utils";
import Timer from "../Timer";

jest.mock("axios", () => ({ default: { get: () => ({ data: new ArrayBuffer(0) }) } }));
jest.mock("../../lib/json", () => ({ decode: () => [], encode: () => "" }));

it("renders a full-screen timer", async () => {
    expect.assertions(1);

    const store = createStore();

    await dispatch(store, actionCreators.setCurrentItem({
        createdAt: 42,
        description: "testDescription",
        id: "dummyId",
        name: "testName",
        spentSeconds: 0,
        tags: ["javascript"],
        updatedAt: 42,
    }));

    const component = mount(<Provider store={store}><Timer /></Provider>);
    const buttons = component.find("button.Timer-button");

    expect(buttons.length).toBe(1);
    buttons.first().simulate("click");
});
