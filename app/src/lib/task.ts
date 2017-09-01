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

export async function createTask(newTask: INewTask): Promise<ITask> {
    const tasks = await getTodoTasks();
    const task: ITask = { createdAt: Date.now(), updatedAt: Date.now(), ...newTask };

    await setTodoTasks([task, ...(tasks ? tasks : [])]);

    return task;
}

export async function switchTaskState(task: ITask): Promise<void> {
    const tasks = await getTodoTasks();

    if (_.findIndex(tasks, task) >= 0) {
        const tasks = await getTodoTasks();

        _.remove(tasks, task);

        await setTodoTasks(tasks);
        await doneTasksReference().push(task);
    } else {
        await setTodoTasks([task, ...(await getTodoTasks())]);
        await removeTask(task);
    }
}

export async function removeTask(task: ITask): Promise<void> {
    await doneTasksReference().child(_.findKey(await getDoneTasks(), task)).remove();
}

export async function editTask(oldTask: ITask, newTask: ITask): Promise<void> {
    await todoTasksReference().child(_.findIndex(await getTodoTasks(), oldTask)).set(newTask);
}

export async function setTodoTasks(tasks: ITask[]): Promise<void> {
    await todoTasksReference().set(tasks);
}

export function onTodoTasksUpdate(callback: (tasks: ITask[]) => void): void {
    todoTasksReference().on("value", (snapshot): void => {
        const tasks = snapshot.val();
        callback(tasks ? tasks : []);
    });
}

export function onDoneTasksUpdate(callback: (tasks: ITask[]) => void): void {
    doneTasksReference().on("value", (snapshot): void => {
        const tasks: { [key: string]: ITask } = snapshot.val();

        if (!tasks) {
            callback([]);
        }

        callback(_.values(tasks).sort((x, y) => y.updatedAt - x.updatedAt));
    });
}
