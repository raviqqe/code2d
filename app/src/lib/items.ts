import * as _ from "lodash";
import nanoid = require("nanoid");

export interface IItem {
    id?: string;
    name: string;
}

export function createId<A extends IItem>(item: A): A {
    return Object.assign({}, item, { id: nanoid() });
}

export function equal<A extends IItem>(x: A, y: A): boolean {
    return x.id === y.id;
}

export function include<A extends IItem>(items: A[], item): boolean {
    return _.find(items, { id: item.id }) !== undefined;
}
