document.body.innerHTML += '<div id="root"/>';

jest.mock("./lib/firebase", () => ({
    initialize: () => undefined,
    onAuthStateChanged: () => undefined,
}));

import "./index";

it("dummy test", () => undefined);
