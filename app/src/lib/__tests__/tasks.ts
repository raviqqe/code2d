import { extractTagsFromTasks, ITask, tasksRepository } from "../tasks";

jest.mock("axios", () => ({
    default: {
        get: (): Promise<{ data: any[] }> => Promise.resolve({ data: null }),
    },
}));

jest.mock("../json", () => ({
    decode: () => Promise.resolve([{}, {}, {}]),
    encode: () => undefined,
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
    expect((await tasksRepository(false).get()).length).toBe(3);
});

it("gets done tasks", async () => {
    expect.assertions(1);
    expect((await tasksRepository(true).get()).length).toBe(3);
});

it("sets tasks", async () => {
    expect.assertions(1);
    await tasksRepository(false).set([dummyTask]);
    expect((await tasksRepository(false).get()).length).toBe(1);
});

it("extracts tags from tasks", () => {
    expect(extractTagsFromTasks([])).toEqual([]);
    expect(extractTagsFromTasks([dummyTask])).toEqual([]);
    expect(extractTagsFromTasks([
        dummyTask,
        { ...dummyTask, tags: ["foo", "bar"] },
        { ...dummyTask, tags: ["foo"] },
    ])).toEqual(["bar", "foo"]);
});
