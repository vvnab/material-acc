import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.stock.brigades;

export const selectLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectError = createSelector(selectDir, (state) => state.error);
export const selectList = createSelector(selectDir, (state) => state.content);
export const selectItemLoading = createSelector(
    selectDir,
    (state) => state.itemLoading
);
export const selectItemError = createSelector(
    selectDir,
    (state) => state.itemError
);
