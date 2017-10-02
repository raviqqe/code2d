import axios from "axios";
import * as firebase from "firebase";
import * as _ from "lodash";

import { IItem } from "./items";
import * as json from "./json";

export default class ItemsRepository<A extends IItem> {
    constructor(private name: string, private done: boolean) { }

    public get = async (): Promise<A[]> => {
        try {
            return json.decode(new Buffer((await axios.get(
                await this.reference.getDownloadURL(), { responseType: "arraybuffer" })).data));
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public set = async (items: A[]): Promise<void> => {
        await this.reference.put(json.encode(items));
    }

    private get reference(): firebase.storage.Reference {
        return firebase.storage().ref(this.path);
    }

    private get path(): string {
        return `users/${firebase.auth().currentUser.uid}/${this.name}/${this.done ? "done" : "todo"}`;
    }
}
