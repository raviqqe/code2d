import ItemsRepository from "./items_repository";

export default class StatefulItemsRepository<A> {
    private todoItems: ItemsRepository<A>;
    private doneItems: ItemsRepository<A>;

    constructor(name: string) {
        this.todoItems = new ItemsRepository(name, false);
        this.doneItems = new ItemsRepository(name, true);
    }

    public state = (done: boolean): ItemsRepository<A> => {
        return done ? this.doneItems : this.todoItems;
    }
}
