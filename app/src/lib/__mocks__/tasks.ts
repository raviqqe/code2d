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
    private tasks: ITask[] = [];

    public get = async (): Promise<ITask[]> => {
        return this.tasks;
    }

    public set = async (tasks: ITask[]): Promise<void> => {
        this.tasks = tasks;
    }

    public include = async (task: ITask): Promise<boolean> => {
        return _.findIndex(this.tasks, task) >= 0;
    }
}

export const todoTasks = new Tasks();
export const doneTasks = new Tasks();
