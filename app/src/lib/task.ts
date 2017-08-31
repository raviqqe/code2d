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
        const tasks = await this.getTodoTasks();
        const task: ITask = { createdAt: Date.now(), updatedAt: Date.now(), ...newTask };

        await this.setTodoTasks([task, ...(tasks ? tasks : [])]);

        return task;
    }

    public switchState = async (task: ITask): Promise<void> => {
        const tasks = await this.getTodoTasks();

        if (_.findIndex(tasks, task) >= 0) {
            const tasks = await this.getTodoTasks();

            _.remove(tasks, task);

            await this.setTodoTasks(tasks);
            await this.doneTasks.push(task);
        } else {
            await this.setTodoTasks([task, ...(await this.getTodoTasks())]);
            await this.remove(task);
        }
    }

    public remove = async (task: ITask): Promise<void> => {
        await this.doneTasks.child(_.findKey(await this.getDoneTasks(), task)).remove();
    }

    public edit = async (oldTask: ITask, newTask: ITask): Promise<void> => {
        this.todoTasks.child(_.findIndex(await this.getTodoTasks(), oldTask)).set(newTask);
    }

    public setTodoTasks = async (tasks: ITask[]): Promise<void> => {
        await this.todoTasks.set(tasks);
    }

    public onTodoTasksUpdate = (callback: (tasks: ITask[]) => void): void => {
        this.todoTasks.on("value", (snapshot): void => {
            const tasks = snapshot.val();
            callback(tasks ? tasks : []);
        });
    }

    public onDoneTasksUpdate = (callback: (tasks: ITask[]) => void): void => {
        this.doneTasks.on("value", (snapshot): void => {
            const tasks: { [key: string]: ITask } = snapshot.val();

            if (!tasks) {
                callback([]);
            }

            callback(_.values(tasks).sort((x, y) => y.updatedAt - x.updatedAt));
        });
    }

    private getTodoTasks = async (): Promise<ITask[]> => {
        const tasks = (await this.todoTasks.once("value")).val();
        return tasks ? tasks : [];
    }

    private getDoneTasks = async (): Promise<{ [key: string]: ITask }> => {
        const tasks = (await this.doneTasks.once("value")).val();
        return tasks ? tasks : {};
    }

    private get todoTasks(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/tasks/todo`);
    }

    private get doneTasks(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/tasks/done`);
    }
}
