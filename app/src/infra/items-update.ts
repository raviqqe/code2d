import { IItem } from "common/domain/item";
import * as database from "common/infra/database";
import * as storage from "common/infra/storage";
import * as firebase from "firebase";

let ref: firebase.database.Reference | null = null;

export function onItemsUpdate<A extends IItem>(
    callback: (itemsName: storage.ItemsName) => void,
): void {
    ref = firebase.database().ref(database.storagePath(firebase.auth().currentUser.uid));

    ref.on("child_changed", async () => callback((await ref.once("value")).val().updatedItems));
}

export function removeCallback(): void {
    if (ref !== null) {
        ref.off("child_changed");
    }
}
