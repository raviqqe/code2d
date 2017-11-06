import axios from "axios";
import { IItem } from "common/domain/item";
import * as json from "common/infra/json";
import * as firebase from "firebase";

export default class ItemsRepository<A extends IItem> {
    constructor(private name: string, private done: boolean) { }

    public get = async (): Promise<A[]> => {
        try {
            return json.decode(new Buffer((await axios.get(
                await this.reference.getDownloadURL(), { responseType: "arraybuffer" })).data));
        } catch (error) {
            if (error.code === "storage/object-not-found") {
                console.error(error);
                return [];
            } else {
                throw error;
            }
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
