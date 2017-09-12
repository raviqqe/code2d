import { ITask, tasksRepository } from "../tasks";

jest.mock("axios", () => ({
    default: {
        get: (): Promise<{ data: any[] }> => Promise.reject(new Error()),
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

it("gets no task on error", async () => {
    expect.assertions(1);
    expect((await tasksRepository(false).get()).length).toBe(0);
});
