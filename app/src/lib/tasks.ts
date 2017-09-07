import axios from "axios";
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
        try {
            return (await axios.get(await this.reference.getDownloadURL())).data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public set = async (tasks: ITask[]): Promise<void> => {
        await this.reference.putString(JSON.stringify(tasks));
    }

    public create = async (task: ITask): Promise<void> => {
        const tasks = await this.get();
        await this.set([task, ...tasks]);
    }

    private get reference(): firebase.storage.Reference {
        return firebase.storage().ref(this.path);
    }

    private get path(): string {
        return `users/${firebase.auth().currentUser.uid}/tasks/${this.done ? "done" : "todo"}`;
    }
}

const todoTasks = new Tasks(false);
const doneTasks = new Tasks(true);

export function tasks(done: boolean): Tasks {
    return done ? doneTasks : todoTasks;
}
