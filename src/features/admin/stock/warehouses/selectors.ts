import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.stock.warehouses;

export const selectLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectError = createSelector(selectDir, (state) => state.error);
export const selectList = createSelector(selectDir, (state) =>
    state.content.map((i) => ({
        ...i,
        materials: i.materials.filter((i) => i.quantity),
    }))
);
export const selectItemLoading = createSelector(
    selectDir,
    (state) => state.itemLoading
);
export const selectItemError = createSelector(
    selectDir,
    (state) => state.itemError
);
