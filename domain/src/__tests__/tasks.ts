import { extractTagsFromTasks, ITask } from "../task";

const dummyTask: ITask = {
    createdAt: 42,
    description: "bar",
    id: "id",
    name: "foo",
    spentSeconds: 42,
    tags: [],
    updatedAt: 42,
};

it("extracts tags from tasks", () => {
    expect(extractTagsFromTasks([])).toEqual([]);
    expect(extractTagsFromTasks([dummyTask])).toEqual([]);
    expect(extractTagsFromTasks([
        dummyTask,
        { ...dummyTask, tags: ["foo", "bar"] },
        { ...dummyTask, tags: ["foo"] },
    ])).toEqual(["bar", "foo"]);
});
