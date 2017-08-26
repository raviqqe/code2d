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
    public create = (task: INewTask): string => {
        return this.reference.push({ ...task, done: false }).key;
    }

    public onUndoneTasksUpdate = (callback: (tasks: ITask[]) => void) => {
        this.reference.orderByChild("done").equalTo(false).on("value", (snapshot) => {
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

    private get reference(): firebase.database.Reference {
        return firebase.database().ref(`users/${firebase.auth().currentUser.uid}/tasks`);
    }
}
