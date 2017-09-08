import * as lib from "../tasks";
import { ITask } from "../tasks";

jest.mock("axios", () => ({
    default: {
        get: (): Promise<{ data: any[] }> => Promise.resolve({ data: [{}, {}, {}] }),
    },
}));

jest.mock("firebase", () => ({
    auth: () => ({ currentUser: { uid: "testUid" } }),
    storage: () => ({
        ref: (path: string) => ({
            getDownloadURL: () => "testUrl",
            putString: (data: string) => undefined,
        }),
    }),
}));

const dummyTask: ITask = {
    createdAt: 42,
    description: "bar",
    name: "foo",
    spentSeconds: 42,
    tags: [],
    updatedAt: 42,
};

it("gets todo tasks", async () => {
    expect.assertions(1);
    expect((await lib.tasks(false).get()).length).toBe(3);
});

it("gets done tasks", async () => {
    expect.assertions(1);
    expect((await lib.tasks(true).get()).length).toBe(3);
});

it("sets tasks", async () => {
    expect.assertions(1);
    await lib.tasks(false).set([dummyTask]);
    expect((await lib.tasks(false).get()).length).toBe(1);
});

it("creates a task", async () => {
    expect.assertions(1);
    await lib.tasks(false).create(dummyTask);
    expect((await lib.tasks(false).get()).length).toBe(2);
});
