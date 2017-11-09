import { IItem } from "common/domain/item";
import { ItemsName } from "common/infra/storage";

import ItemsRepository from "./items-repository";

export default class StatefulItemsRepository<A extends IItem> {
    private todoItems: ItemsRepository<A>;
    private doneItems: ItemsRepository<A>;

    constructor(
        name: ItemsName,
        public onUpdate: (callback: () => void) => void,
    ) {
        this.todoItems = new ItemsRepository(name, false);
        this.doneItems = new ItemsRepository(name, true);
    }

    public state = (done: boolean): ItemsRepository<A> => {
        return done ? this.doneItems : this.todoItems;
    }
}
