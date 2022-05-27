import { createSelector } from 'reselect';
import { IState } from './types';

const selectDir = (state: any): IState => state.brigadesSummary;

export const selectLoading = createSelector(
    selectDir,
    (state) => state.loading
);
export const selectRange = createSelector(
    selectDir,
    (state) => state.range
);
export const selectError = createSelector(selectDir, (state) => state.error);
export const selectList = createSelector(
    selectDir,
    (state) => state.content
);
