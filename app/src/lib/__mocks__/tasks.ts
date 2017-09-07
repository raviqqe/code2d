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
    private tasks: ITask[] = [{
        createdAt: 42,
        description: "testDescription",
        name: "testName",
        spentSeconds: 42,
        updatedAt: 42,
    }];

    public get = async (): Promise<ITask[]> => {
        return this.tasks;
    }

    public set = async (tasks: ITask[]): Promise<void> => {
        this.tasks = tasks;
    }

    public create = async (task: ITask): Promise<void> => {
        this.tasks = [task, ...this.tasks];
    }

    public include = async (task: ITask): Promise<boolean> => {
        return _.findIndex(this.tasks, task) >= 0;
    }
}

let todoTasks = new Tasks();
let doneTasks = new Tasks();

export function tasks(done: boolean) {
    return done ? doneTasks : todoTasks;
}

export function resetMocks() {
    todoTasks = new Tasks();
    doneTasks = new Tasks();
}
