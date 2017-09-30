import { ITask, tasksRepository } from "../tasks";

jest.mock("axios", () => ({
    default: {
        get: (): Promise<any> => Promise.reject(new Error()),
    },
}));

it("gets no task on error", async () => {
    expect.assertions(1);
    expect((await tasksRepository(false).get()).length).toBe(0);
});
