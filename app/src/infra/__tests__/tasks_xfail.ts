import { ITask } from "common/domain/task";

import { tasksRepository } from "../tasks";

jest.mock("axios", () => ({
    default: {
        get: (): Promise<any> => Promise.reject({ code: "storage/object-not-found" }),
    },
}));

it("gets no task on error", async () => {
    expect.assertions(1);
    expect((await tasksRepository.state(false).get()).length).toBe(0);
});
