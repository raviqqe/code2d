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

function tasksReference(done: boolean): firebase.database.Reference {
    return firebase.database().ref(path(done));
}

async function getTasks(done: boolean): Promise<ITask[]> {
    const tasks = (await tasksReference(done).once("value")).val();
    return tasks ? tasks : [];
}

export async function createTask(newTask: INewTask): Promise<ITask> {
    const task: ITask = { createdAt: Date.now(), updatedAt: Date.now(), ...newTask };

    await setTodoTasks([task, ...(await getTasks(false))]);

    return task;
}

export async function switchTaskState(task: ITask): Promise<void> {
    if (_.findIndex(await getTasks(false), task) >= 0) {
        await removeTodoTask(task);
        await setDoneTasks([task, ...(await getTasks(true))]);
    } else {
        await removeDoneTask(task);
        await setTodoTasks([task, ...(await getTasks(false))]);
    }
}

async function removeTask(done: boolean, task: ITask): Promise<void> {
    const tasks = await getTasks(done);

    _.remove(tasks, task);

    await setTasks(done, tasks);
}

export async function removeTodoTask(task: ITask): Promise<void> {
    await removeTask(false, task);
}

export async function removeDoneTask(task: ITask): Promise<void> {
    await removeTask(true, task);
}

export async function editTask(oldTask: ITask, newTask: ITask): Promise<void> {
    await tasksReference(false).child(_.findIndex(await getTasks(false), oldTask)).set(newTask);
}

async function setTasks(done: boolean, tasks: ITask[]): Promise<void> {
    await tasksReference(done).set(tasks);
}

export async function setTodoTasks(tasks: ITask[]): Promise<void> {
    await setTasks(false, tasks);
}

export async function setDoneTasks(tasks: ITask[]): Promise<void> {
    await setTasks(true, tasks);
}

function onTasksUpdate(done: boolean, callback: (tasks: ITask[]) => void): void {
    tasksReference(done).on("value", (snapshot): void => {
        const tasks = snapshot.val();
        callback(tasks ? tasks : []);
    });
}

export function onTodoTasksUpdate(callback: (tasks: ITask[]) => void): void {
    onTasksUpdate(false, callback);
}

export function onDoneTasksUpdate(callback: (tasks: ITask[]) => void): void {
    onTasksUpdate(true, callback);
}
