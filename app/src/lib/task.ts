import * as firebase from "firebase";
import * as _ from "lodash";

export interface INewTask {
    name: string;
    description: string;
}

export interface ITask extends INewTask {
    createdAt: number;
    updatedAt: number;
}

export class Tasks {
    public create = async (task: INewTask): Promise<void> => {
        const tasks = await this.getUndoneTasks();

        this.setUndoneTasks([
            { createdAt: Date.now(), updatedAt: Date.now(), ...task },
            ...(tasks ? tasks : []),
        ]);
    }

    public markDone = async (task: ITask): Promise<void> => {
        const tasks = await this.getUndoneTasks();

        _.remove(tasks, task);

        await this.setUndoneTasks(tasks);
        await this.doneTasks.push(task);
    }

    public edit = async (oldTask: ITask, newTask: ITask): Promise<void> => {
        this.undoneTasks.child(_.findIndex(await this.getUndoneTasks(), oldTask)).set(newTask);
    }

    public setUndoneTasks = async (tasks: ITask[]): Promise<void> => {
        await this.undoneTasks.set(tasks);
    }

    public onUndoneTasksUpdate = (callback: (tasks: ITask[]) => void): void => {
        this.undoneTasks.on("value", async (snapshot): Promise<void> => {
            const tasks = snapshot.val();
            callback(tasks ? tasks : []);
        });
    }

    public onDoneTasksUpdate = (callback: (tasks: ITask[]) => void): void => {
        this.doneTasks.on("value", async (snapshot): Promise<void> => {
            const tasks: { [key: string]: ITask } = snapshot.val();

            if (!tasks) {
                callback([]);
            }

            callback(_.values(tasks).sort((x, y) => y.updatedAt - x.updatedAt));
        });
    }

    private getUndoneTasks = async (): Promise<ITask[]> => {
        return (await this.undoneTasks.once("value")).val();
    }

    private get undoneTasks(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/tasks/undone`);
    }

    private get doneTasks(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/tasks/done`);
    }
}
