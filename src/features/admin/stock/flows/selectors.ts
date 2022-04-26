import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.stock.flows;

export const selectLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectError = createSelector(selectDir, (state) => state.error);
export const selectFilter = createSelector(selectDir, (state) => state.filter);
export const selectList = createSelector(selectDir, (state) => state.content);
export const selectPages = createSelector(selectDir, (state) => ({
    pageNumber: state.pageNumber,
    totalPages: state.totalPages,
}));
export const selectItemLoading = createSelector(
    selectDir,
    (state) => state.itemLoading
);
export const selectItemError = createSelector(
    selectDir,
    (state) => state.itemError
);
