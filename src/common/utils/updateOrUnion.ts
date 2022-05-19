import { unionBy } from "lodash";

export const updateOrUnion = (collection: any[], item: any) => {
    const existingItem = collection.find((i) => i.id === item.id);
    if (existingItem) {
        return [...collection.map((i) => (i.id === item.id ? item : i))];
    } else {
        return [item, ...collection];
    }
};

export const update = (collection: any[], items: any[]) => {
    const union = unionBy(collection, items, 'id');
    console.log(collection, items, union)
    return union;
};



