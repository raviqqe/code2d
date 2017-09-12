import * as _ from "lodash";

import StatefulItemsRepository from "./stateful_items_repository";

export interface INewTask {
    name: string;
    description: string;
    tags: string[];
}

export interface ITask extends INewTask {
    createdAt: number;
    spentSeconds: number;
    updatedAt: number;
}

const repository = new StatefulItemsRepository<ITask>("tasks");

export const tasks = repository.state;

export function extractTagsFromTasks(tasks: ITask[]): string[] {
    return _.uniq(_.flatMap(tasks, ({ tags }) => tags)).sort();
}

export function resetMocks(): void {
    // Do nothing in real module.
}
