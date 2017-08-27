import * as functions from "firebase-functions";

const maxTasks = 64;

export const limitTasks = functions.database.ref("users/{userId}/tasks/{state}/{taskId}").onCreate(
    async ({ data: { ref: { parent } } }) => {
        const snapshot = await parent.once("value");

        if (snapshot.numChildren() >= maxTasks) {
            const idToTask = snapshot.val();

            await parent.update(Object.keys(idToTask)
                .map((id: string) => idToTask[id])
                .sort((x, y) => x.updatedAt - y.updatedAt)
                .slice(0, maxTasks));
        }
    });
