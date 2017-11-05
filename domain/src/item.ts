import * as _ from "lodash";

export interface IItem {
    id: string;
    name: string;
}

export function equal<A extends IItem>(x: A, y: A): boolean {
    return x.id === y.id;
}

export function include<A extends IItem>(items: A[], { id }: A): boolean {
    return !!_.find(items, { id });
}
