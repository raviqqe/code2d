export type ItemsName = "tasks" | "articles" | "videos" | "books";

export function itemsPath(name: ItemsName, done: boolean, userId: string): string {
    return `/users/${userId}/${name}/${done ? "done" : "todo"}`;
}
