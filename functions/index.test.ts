import { extractOldTasks } from "./index";

jest.mock(
    "firebase-functions",
    () => ({ database: { ref: () => ({ onCreate: () => undefined }) } }));

describe("extractOldTasks", () => {
    it("extracts old tasks", () => {
        const tasks = [{ updatedAt: 3 }, { updatedAt: 1 }, { updatedAt: 4 }, { updatedAt: 2 }];
        expect(extractOldTasks(tasks, 2)).toEqual([{ updatedAt: 2 }, { updatedAt: 1 }]);
    });
});
