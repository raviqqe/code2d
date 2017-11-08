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

export function addItemToItems<A extends IItem>(items: A[], item: A): A[] {
    return [item, ...(removeItemFromItems(items, item.id))];
}

export function removeItemFromItems<A extends IItem>(items: A[], id: string): A[] {
    items = [...items];
    _.remove(items, { id });
    return items;
}
