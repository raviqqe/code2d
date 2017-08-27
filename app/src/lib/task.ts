import * as firebase from "firebase";

export interface INewTask {
    name: string;
    description: string;
}

export interface ITask extends INewTask {
    id: string;
}

export class Tasks {
    public create = async (task: INewTask): Promise<void> => {
        const ids = (await this.taskList.once("value")).val();

        this.taskList.set([
            this.tasks.push(task).key,
            ...(ids ? ids : []),
        ]);
    }

    public onUndoneTasksUpdate = (callback: (tasks: ITask[]) => void): void => {
        this.taskList.on("value", async (snapshot): Promise<void> => {
            const ids: string[] = snapshot.val();

            if (!ids) {
                callback([]);
                return;
            }

            callback(await Promise.all(ids.map(async (id: string) => ({
                id,
                ...(await this.tasks.orderByKey().equalTo(id).once("value")).val()[id],
            }))));
        });
    }

    private get tasks(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/tasks`);
    }

    private get taskList(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/taskList`);
    }
}
