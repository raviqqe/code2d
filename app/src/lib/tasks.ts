import * as firebase from "firebase";
import * as _ from "lodash";

export interface INewTask {
    name: string;
    description: string;
}

export interface ITask extends INewTask {
    createdAt: number;
    spentSeconds: number;
    updatedAt: number;
}

class Tasks {
    private done: boolean;

    constructor(done: boolean) {
        this.done = done;
    }

    public get = async (): Promise<ITask[]> => {
        const tasks = (await this.reference.once("value")).val();
        return tasks ? tasks : [];
    }

    public set = async (tasks: ITask[]): Promise<void> => {
        await this.reference.set(tasks);
    }

    public include = async (task: ITask): Promise<boolean> => {
        return _.findIndex(await this.get(), task) >= 0;
    }

    private get reference(): firebase.database.Reference {
        return firebase.database().ref(this.path);
    }

    private get path(): string {
        return `users/${firebase.auth().currentUser.uid}/tasks/${this.done ? "done" : "todo"}`;
    }
}

export const todoTasks = new Tasks(false);
export const doneTasks = new Tasks(true);
