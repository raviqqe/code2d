import { ITask } from "common/domain/task";
import { tasksRepository } from "../tasks";

jest.mock("axios", () => ({
    default: {
        get: (): Promise<{ data: ArrayBuffer }> => Promise.resolve({ data: new ArrayBuffer(0) }),
    },
}));

jest.mock("common/infra/json", () => ({
    decode: () => Promise.resolve([{}, {}, {}]),
    encode: () => undefined,
}));

it("gets todo tasks", async () => {
    expect.assertions(1);
    expect((await tasksRepository.state(false).get()).length).toBe(3);
});

it("gets done tasks", async () => {
    expect.assertions(1);
    expect((await tasksRepository.state(true).get()).length).toBe(3);
});

it("sets tasks", async () => {
    await tasksRepository.state(false).set([{
        createdAt: 42,
        description: "bar",
        id: "id",
        name: "foo",
        spentSeconds: 42,
        tags: [],
        updatedAt: 42,
    }]);
});
