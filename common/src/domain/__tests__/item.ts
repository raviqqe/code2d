import { addItemToItems, IItem, removeItemFromItems } from "../item";

const foo: IItem = { id: "foo", name: "foo" };
const newFoo: IItem = { id: "foo", name: "newFoo" };
const bar: IItem = { id: "bar", name: "bar" };

test("Add an item to items", () => {
    for (const { item, items, result } of [
        {
            item: foo,
            items: [],
            result: [foo],
        },
        {
            item: foo,
            items: [foo],
            result: [foo],
        },
        {
            item: newFoo,
            items: [foo],
            result: [newFoo],
        },
        {
            item: bar,
            items: [foo],
            result: [bar, foo],
        },
        {
            item: foo,
            items: [bar, foo],
            result: [foo, bar],
        },
        {
            item: newFoo,
            items: [bar, foo],
            result: [newFoo, bar],
        },
    ]) {
        const oldItems = [...items];

        expect(addItemToItems(items, item)).toEqual(result);
        expect(items).toEqual(oldItems);
    }
});

test("Remove an item from items", () => {
    for (const { id, items, result } of [
        {
            id: "foo",
            items: [],
            result: [],
        },
        {
            id: "foo",
            items: [foo],
            result: [],
        },
        {
            id: "foo",
            items: [foo, bar],
            result: [bar],
        },
        {
            id: "foo",
            items: [foo, foo, bar],
            result: [bar],
        },
        {
            id: "foo",
            items: [foo, foo, bar, foo, bar, foo, foo, bar, bar, bar, foo],
            result: [bar, bar, bar, bar, bar],
        },
    ]) {
        const oldItems = [...items];

        expect(removeItemFromItems(items, id)).toEqual(result);
        expect(items).toEqual(oldItems);
    }
});
