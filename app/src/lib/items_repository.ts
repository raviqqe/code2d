import axios from "axios";
import * as firebase from "firebase";
import * as _ from "lodash";

import { IItem } from "./items";
import * as json from "./json";

export default class ItemsRepository<A extends IItem> {
    private items: A[] | null = null;

    constructor(private name: string, private done: boolean) { }

    public get = async (): Promise<A[]> => {
        if (_.isArray(this.items)) {
            return this.items;
        }

        try {
            this.items = await json.decode(
                (await axios.get(await this.reference.getDownloadURL())).data);
            return this.items;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public set = async (items: A[]): Promise<void> => {
        this.items = items;
        await this.reference.putString(json.encode(items));
    }

    public create = async (item: A): Promise<void> => {
        await this.set([item, ...(await this.get())]);
    }

    public initialize = () => {
        this.items = null;
    }

    private get reference(): firebase.storage.Reference {
        return firebase.storage().ref(this.path);
    }

    private get path(): string {
        return `users/${firebase.auth().currentUser.uid}/${this.name}/${this.done ? "done" : "todo"}`;
    }
}
