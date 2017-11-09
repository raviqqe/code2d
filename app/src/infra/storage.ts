import { IItem } from "common/domain/item";
import * as database from "common/infra/database";
import { ItemsName } from "common/infra/storage";
import * as firebase from "firebase";

import StatefulItemsRepository from "./stateful-items-repository";

class Storage {
    private ref: firebase.database.Reference | null = null;
    private updateCallbacks: Array<(itemsName: ItemsName) => void> = [];

    public initialize() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user === null) {
                this.ref = null;
            } else {
                this.ref = firebase.database().ref(database.storagePath(user.uid));

                for (const callback of this.updateCallbacks) {
                    this.ref.on(
                        "child_changed",
                        async () => callback((await this.ref.once("value")).val().updatedItems));
                }
            }
        });
    }

    public statefulItemsRepository
        = <A extends IItem>(itemsName: ItemsName): StatefulItemsRepository<A> => {
            return new StatefulItemsRepository<A>(
                itemsName,
                (callback: () => void) => this.updateCallbacks.push(
                    (updatedItemsName: ItemsName) => {
                        if (itemsName === updatedItemsName) {
                            callback();
                        }
                    }));
        }
}

const storage = new Storage();

export default storage;
