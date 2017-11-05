import * as _ from "lodash";
import nanoid = require("nanoid");

import { IItem } from "./item";

export interface INewTask {
    name: string;
    description: string;
    tags: string[];
}

export interface ITask extends IItem, INewTask {
    createdAt: number;
    spentSeconds: number;
    updatedAt: number;
}

export function createTask(task: INewTask): ITask {
    return {
        ...task,
        createdAt: Date.now(),
        id: nanoid(),
        spentSeconds: 0,
        updatedAt: Date.now(),
    };
}

export function extractTagsFromTasks(tasks: ITask[]): string[] {
    return _.uniq(_.flatMap(tasks, ({ tags }) => tags)).sort();
}
