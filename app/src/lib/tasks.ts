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

    public create = async (newTask: ITask | INewTask): Promise<ITask> => {
        const task: ITask = {
            createdAt: Date.now(),
            spentSeconds: 0,
            ...newTask,
            updatedAt: Date.now(),
        };

        await this.setAll([task, ...(await this.getAll())]);

        return task;
    }

    public remove = async (task: ITask): Promise<void> => {
        const tasks = await this.getAll();

        _.remove(tasks, task);

        await this.setAll(tasks);
    }

    public set = async (oldTask: ITask, newTask: ITask): Promise<void> => {
        await this.reference.child(_.findIndex(await this.getAll(), oldTask)).set(newTask);
    }

    public getAll = async (): Promise<ITask[]> => {
        const tasks = (await this.reference.once("value")).val();
        return tasks ? tasks : [];
    }

    public setAll = async (tasks: ITask[]): Promise<void> => {
        await this.reference.set(tasks);
    }

    public include = async (task: ITask): Promise<boolean> => {
        return _.findIndex(await this.getAll(), task) >= 0;
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

export async function switchTaskState(task: ITask): Promise<void> {
    if (await todoTasks.include(task)) {
        await todoTasks.remove(task);
        await doneTasks.create(task);
    } else {
        await doneTasks.remove(task);
        await todoTasks.create(task);
    }
}
