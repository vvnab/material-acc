export const updateOrUnion = (collection: any[], item: any) => {
    console.log(item);
    const existingItem = collection.find((i) => i.id === item.id);
    if (existingItem) {
        return [...collection.map((i) => (i.id === item.id ? item : i))];
    } else {
        return [...collection, item];
    }
};
