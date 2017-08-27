import * as functions from "firebase-functions";
import * as _ from "lodash";

const maxTasks = 64;

interface ITask {
    key?: string;
    updatedAt: number;
}

export const truncateUndoneTasks = createTruncateTasksFunction(
    "undone",
    (tasks: ITask[]) => {
        for (const task of extractOldTasks(tasks)) {
            _.remove(tasks, task);
        }

        return tasks;
    });

export const truncateDoneTasks = createTruncateTasksFunction(
    "done",
    (keyToTask: { [key: string]: ITask }) => {
        for (const { key } of extractOldTasks(
            Object.keys(keyToTask).map((key) => ({ key, ...keyToTask[key] })))) {
            delete keyToTask[key];
        }

        return keyToTask;
    });

function createTruncateTasksFunction<T>(
    state: "done" | "undone",
    callback: (tasks: T) => T) {
    return functions.database.ref(`users/{userId}/tasks/${state}/{taskId}`).onCreate(
        async ({ data: { ref: { parent } } }) => {
            const snapshot = await parent.once("value");

            if (snapshot.numChildren() >= maxTasks) {
                await parent.set(callback(snapshot.val()));
            }
        });
}

function extractOldTasks(tasks: ITask[]): ITask[] {
    return [...tasks].sort((x, y) => y.updatedAt - x.updatedAt).slice(maxTasks);
}
