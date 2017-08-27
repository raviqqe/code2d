import * as firebase from "firebase";
import * as _ from "lodash";

export interface INewTask {
    name: string;
    description: string;
}

export interface ITask extends INewTask {
    id: string;
    createdAt: number;
    updatedAt: number;
}

export class Tasks {
    public create = async (task: INewTask): Promise<void> => {
        const ids = (await this.taskList.once("value")).val();

        this.taskList.set([
            this.tasks.push({ createdAt: Date.now(), updatedAt: Date.now(), ...task }).key,
            ...(ids ? ids : []),
        ]);
    }

    public removeTask = async (removedId: string): Promise<void> => {
        const ids = (await this.taskList.once("value")).val();

        _.remove(ids, (id) => id === removedId);

        await this.setTaskList(ids);
        await this.tasks.child(removedId).remove();
    }

    public setTaskList = async (taskIds: string[]): Promise<void> => {
        await this.taskList.set(taskIds);
    }

    public onTaskListUpdate = (callback: (tasks: ITask[]) => void): void => {
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
