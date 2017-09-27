import "raf/polyfill";

import * as enzyme from "enzyme";
import Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
    // https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests

    private store: { [key: string]: any } = {};

    public clear() {
        this.store = {};
    }

    public getItem(key) {
        return this.store[key] || null;
    }

    public setItem(key, value) {
        this.store[key] = value.toString();
    }

    public removeItem(key) {
        delete this.store[key];
    }
}

(global as any).localStorage = new LocalStorageMock();

(global as any).Notification = class {
    public static permission = "granted";

    public static requestPermission() {
        // Do nothing.
    }
};
