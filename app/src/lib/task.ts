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
    public create = async (newTask: INewTask): Promise<ITask> => {
        const tasks = await getTodoTasks();
        const task: ITask = { createdAt: Date.now(), updatedAt: Date.now(), ...newTask };

        await this.setTodoTasks([task, ...(tasks ? tasks : [])]);

        return task;
    }

    public switchState = async (task: ITask): Promise<void> => {
        const tasks = await getTodoTasks();

        if (_.findIndex(tasks, task) >= 0) {
            const tasks = await getTodoTasks();

            _.remove(tasks, task);

            await this.setTodoTasks(tasks);
            await doneTasksReference().push(task);
        } else {
            await this.setTodoTasks([task, ...(await getTodoTasks())]);
            await this.remove(task);
        }
    }

    public remove = async (task: ITask): Promise<void> => {
        await doneTasksReference().child(_.findKey(await getDoneTasks(), task)).remove();
    }

    public edit = async (oldTask: ITask, newTask: ITask): Promise<void> => {
        todoTasksReference().child(_.findIndex(await getTodoTasks(), oldTask)).set(newTask);
    }

    public setTodoTasks = async (tasks: ITask[]): Promise<void> => {
        await todoTasksReference().set(tasks);
    }

    public onTodoTasksUpdate = (callback: (tasks: ITask[]) => void): void => {
        todoTasksReference().on("value", (snapshot): void => {
            const tasks = snapshot.val();
            callback(tasks ? tasks : []);
        });
    }

    public onDoneTasksUpdate = (callback: (tasks: ITask[]) => void): void => {
        doneTasksReference().on("value", (snapshot): void => {
            const tasks: { [key: string]: ITask } = snapshot.val();

            if (!tasks) {
                callback([]);
            }

            callback(_.values(tasks).sort((x, y) => y.updatedAt - x.updatedAt));
        });
    }
}

function path(done: boolean): string {
    return `users/${firebase.auth().currentUser.uid}/tasks/${done ? "done" : "todo"}`;
}

function todoTasksReference(): firebase.database.Reference {
    return firebase.database().ref(path(false));
}

function doneTasksReference(): firebase.database.Reference {
    return firebase.database().ref(path(true));
}

async function getTodoTasks(): Promise<ITask[]> {
    const tasks = (await todoTasksReference().once("value")).val();
    return tasks ? tasks : [];
}

async function getDoneTasks(): Promise<{ [key: string]: ITask }> {
    const tasks = (await doneTasksReference().once("value")).val();
    return tasks ? tasks : {};
}
