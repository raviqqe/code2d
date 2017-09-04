import * as functions from "firebase-functions";
import * as _ from "lodash";

const maxTasks = 64;

interface ITask {
    key?: string;
    updatedAt: number;
}

export const truncateTasks = functions.database.ref("users/{userId}/tasks/{state}/{taskId}").onCreate(
    async ({ data: { ref: { parent } } }) => {
        const snapshot = await parent.once("value");

        if (snapshot.numChildren() > maxTasks) {
            const tasks = snapshot.val();

            for (const task of extractOldTasks(tasks)) {
                _.remove(tasks, task);
            }

            await parent.set(tasks);
        }
    });

function extractOldTasks(tasks: ITask[]): ITask[] {
    return _.sortBy(tasks, ({ updatedAt }) => -updatedAt).slice(maxTasks);
}
