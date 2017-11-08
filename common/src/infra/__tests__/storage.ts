import { ItemsName, itemsPath } from "../storage";

test("Generate items storage path", () => {
    for (const { itemsName, userId, done, path } of [
        { itemsName: "tasks", userId: "userId", done: false, path: "/users/userId/tasks/todo" },
        { itemsName: "tasks", userId: "myId", done: false, path: "/users/myId/tasks/todo" },
        { itemsName: "articles", userId: "userId", done: false, path: "/users/userId/articles/todo" },
        { itemsName: "tasks", userId: "userId", done: true, path: "/users/userId/tasks/done" },
    ]) {
        expect(itemsPath(itemsName as ItemsName, done, userId)).toBe(path);
    }
});
