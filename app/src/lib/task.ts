import * as firebase from "firebase";

export interface INewTask {
    name: string;
    description: string;
}

export interface ITask extends INewTask {
    id: string;
    done: boolean;
}

export class Tasks {
    public create(task: INewTask): string {
        return this.ref.push({ ...task, done: false }).key;
    }

    public async findAll(): Promise<{ [key: string]: ITask }> {
        return (await this.ref.once("value")).val();
    }

    public onUndoneTasksUpdate(callback: (tasks: ITask[]) => void) {
        this.ref.orderByChild("done").equalTo(false).on("value", (snapshot) => {
            const idToTask = snapshot.val();

            if (!idToTask) {
                callback([]);
                return;
            }

            const tasks: ITask[] = [];

            for (const id of Object.keys(idToTask)) {
                tasks.push({ id, ...idToTask[id] });
            }

            callback(tasks);
        });
    }

    private get ref(): firebase.database.Reference {
        return firebase.database().ref(this.path);
    }

    private get path(): string {
        return `users/${firebase.auth().currentUser.uid}/tasks`;
    }
}
